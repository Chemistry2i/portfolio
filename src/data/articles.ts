import binanceEventImg from '@/assets/gallery/binance-event.jpeg';

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  icon: string;
  /** Optional cover image displayed at the top of the article page. */
  coverImage?: string;
  coverImageAlt?: string;
}

export const articles: Article[] = [
  {
    id: 7,
    slug: 'backend-concepts-explained',
    title: 'Backend Concepts Explained: Load Balancing, Caching, Queues and More',
    excerpt: 'A practical tour of the backend ideas behind fast, reliable apps — load balancing, caching, databases, queues, rate limiting, and how I apply them in Node.js and Spring Boot projects.',
    content: `
## Why These Concepts Matter

A backend works fine with ten users and falls apart with ten thousand. The difference is rarely the language you chose — it is how requests are distributed, what you avoid recomputing, and how you handle work that does not need to happen right now. Here are the ideas I lean on most.

## 1. Load Balancing

A load balancer sits in front of several application servers and spreads incoming requests between them. It gives you two things: **capacity** (add another server instead of a bigger one) and **resilience** (one server dies, traffic shifts to the rest).

Common strategies:

- **Round robin** — each server takes the next request in turn. Simple and fine when servers are identical.
- **Least connections** — send the request to the server currently handling the fewest. Better for long-lived requests.
- **IP hash / sticky sessions** — the same client always lands on the same server. Useful when sessions live in memory — but avoid it if you can, and keep sessions in Redis instead so any server can serve any user.

Health checks are the part people forget: the balancer must remove a failing instance automatically, otherwise it keeps routing users into an error page.

## 2. Caching

Caching is storing the answer so you do not have to compute it twice. Where you cache matters:

- **Browser cache** — static assets with long \`Cache-Control\` lifetimes and hashed filenames.
- **CDN cache** — images, JS, CSS, and even HTML served from an edge node near the user.
- **Application cache (Redis/Memcached)** — query results, session data, computed dashboards.
- **Database cache** — query plans and buffer pools the database manages for you.

Two patterns cover most cases:

- **Cache-aside**: read from cache, on a miss read the database and write the value back. Simple and forgiving.
- **Write-through**: every write updates the database *and* the cache, so reads are always warm.

The hard part is invalidation. My rule: give every cached key a TTL even if you also invalidate explicitly, so a stale value can never live forever.

## 3. Databases: Indexing, Normalization, Transactions

- **Indexes** turn a full table scan into a lookup. Index the columns you filter and join on — and remember every index slows down writes, so do not index everything.
- **Normalization** removes duplicated data and keeps it consistent; **denormalization** deliberately duplicates it to avoid expensive joins on read-heavy paths. Real systems use both.
- **Transactions (ACID)** keep multi-step operations all-or-nothing — the reason I still reach for MySQL for anything involving money, grades, or inventory.
- **Replication** gives you read replicas and a failover copy; **sharding** splits data across databases when one machine can no longer hold it.

## 4. Message Queues and Background Jobs

Not every task belongs in the request/response cycle. Sending email, generating a PDF, resizing images, syncing a third-party API — push these onto a queue (RabbitMQ, Redis-backed BullMQ, SQS) and let workers process them.

Benefits: the user gets an instant response, spikes are absorbed instead of dropped, and failed jobs can retry with backoff. Make your jobs **idempotent** — a retried job must not charge the card twice.

## 5. Rate Limiting and Throttling

Rate limiting protects you from abuse and from accidental floods. The token bucket algorithm is the usual choice: each client gets tokens that refill over time, and a request costs one token. Return \`429 Too Many Requests\` with a \`Retry-After\` header so well-behaved clients back off politely.

## 6. Statelessness and Horizontal Scaling

An application server should hold no user state in memory. Push sessions to Redis, files to object storage, and configuration to environment variables. Once servers are interchangeable, scaling out is just launching more of them.

## 7. Observability

You cannot fix what you cannot see:

- **Structured logs** with a request ID that follows a request through every service
- **Metrics** — request rate, error rate, latency percentiles (p95 and p99 matter far more than the average)
- **Tracing** to find which downstream call is actually slow
- **Alerts** on symptoms users feel, not on CPU graphs

## 8. Resilience Patterns

- **Timeouts** on every network call — an unbounded wait ties up a thread forever
- **Retries with exponential backoff and jitter**, never a tight retry loop
- **Circuit breakers** that stop calling a failing dependency and fail fast instead
- **Graceful degradation** — serve stale cached data rather than an error page

## 9. Security Basics That Are Non-Negotiable

Hash passwords with bcrypt or Argon2, validate every input on the server, use parameterized queries, scope authorization checks server-side, keep secrets out of the repository, and serve everything over HTTPS.

## 10. API Design: REST, GraphQL and Versioning

A good API is a contract. REST stays the workhorse: nouns for resources (\`/users/42\`), HTTP verbs for actions (GET reads, POST creates, PUT/PATCH updates, DELETE removes), and status codes that actually mean something — 200 OK, 201 Created, 400 for bad input, 401 unauthenticated, 403 unauthorized, 404 not found, 409 conflict, 422 validation failed, 500 server error.

GraphQL lets the client ask for exactly the fields it needs — great for complex dashboards with many related entities, at the cost of harder caching and the need for query-depth limits. **Versioning** (\`/api/v1/...\`) protects existing clients when you must make a breaking change. And never break a contract silently: deprecate, announce, then remove.

## 11. Pagination

Returning all rows is a bug waiting for growth. Two strategies:

- **Offset pagination** (\`?page=3&limit=20\`) — simple, supports "jump to page", but slow and unstable on huge tables because the database still scans the skipped rows.
- **Cursor pagination** (\`?cursor=abc123\`) — "give me the 20 rows after this ID." Fast at any depth and stable when rows are inserted while scrolling. This is what feeds and infinite scroll should use.

Always set a maximum page size so a client cannot ask for a million rows.

## 12. Authentication vs Authorization

- **Authentication** answers "who are you?" — passwords, OAuth, magic links.
- **Authorization** answers "what may you do?" — roles and permissions.

**JWTs** are signed tokens carrying claims the server can verify without a database lookup; keep them short-lived and pair them with refresh tokens stored in httpOnly cookies. **OAuth 2.0** is what powers "Sign in with Google" — your app never sees the user's Google password. And always check authorization on the server for every request, never trust a flag sent from the client.

## 13. Idempotency

An operation is idempotent when doing it twice has the same effect as doing it once. GET and DELETE are naturally idempotent; POST is not. If a user double-clicks "Pay" or the network retries a request, you must not charge twice. The fix is an **idempotency key**: the client generates a unique key per operation, the server stores it, and a duplicate request returns the original result instead of re-executing.

## 14. Connection Pooling

Opening a database connection is expensive — TCP handshake, authentication, memory allocation. A **connection pool** keeps a set of open connections and hands them out to requests as they arrive, then returns them for reuse. Tools like HikariCP (Java) and PgBouncer (PostgreSQL) exist for exactly this. Size the pool deliberately: too small and requests queue, too large and the database drowns in idle connections.

## 15. Consistency Models and the CAP Theorem

- **Strong consistency**: every read sees the latest write. Simple to reason about, costs latency and availability.
- **Eventual consistency**: replicas converge over time. Reads may briefly be stale, but the system stays available during network splits.

The **CAP theorem** says that during a network partition you must choose between consistency and availability — you cannot have both. Financial balances favor consistency; social feeds and view counts happily accept eventual consistency.

## 16. Microservices vs Monoliths

A **monolith** is one deployable application — simple to develop, test, and deploy, and the right default for most teams. **Microservices** split the system into independently deployable services, which helps large teams scale but adds distributed-systems pain: network failures between services, distributed transactions, versioned contracts, and observability across boundaries. The honest advice: start with a well-modularized monolith and split out a service only when a concrete scaling or team need appears.

## 17. WebSockets and Real-Time Communication

HTTP is request/response — the server cannot push. **WebSockets** upgrade an HTTP connection into a persistent, two-way channel for chat, live scores, and collaborative editing. **Server-Sent Events** are a simpler one-way push from server to browser over plain HTTP, perfect for notifications and live feeds. For occasional updates, **polling** (the client asks every N seconds) is often good enough and far simpler.

## 18. Webhooks

Webhooks are "reverse APIs": instead of you polling a third party for changes, they POST an event to your endpoint the moment something happens — a payment succeeded, a repository was pushed to. Always verify the webhook signature (an HMAC over the body with a shared secret), respond quickly, and process the event asynchronously so retries cannot overwhelm you.

## 19. Containerization and Orchestration

**Docker** packages your app with its exact runtime and dependencies into an image, ending "works on my machine." The same image runs on your laptop, CI, and production. **Kubernetes** orchestrates many containers across machines: it restarts crashed containers, scales replicas up and down, rolls out new versions gradually, and routes traffic. For small projects, a plain VM, Render, or a managed platform is usually enough — adopt orchestration when you actually have many services.

## 20. CI/CD

**Continuous Integration**: every push builds the app and runs tests automatically, catching breakage in minutes instead of at release time. **Continuous Deployment**: merges to the main branch roll out to production automatically, usually through staged environments and health-checked rollbacks. The real benefit is not speed — it is that small, frequent, tested changes are far safer than rare, giant releases.

## 21. Background Jobs, Cron and Scheduling

Some work runs on a clock, not a request: nightly report generation, cleaning expired sessions, sending reminder emails. **Cron** schedules these, and job frameworks (node-cron, Quartz in Spring) manage them inside the app. Keep scheduled jobs short, log every run, and add a lock so two servers do not run the same job twice.

## 22. Object Storage

Files do not belong in your database or on your app server's disk — they disappear when the container restarts and make backups huge. **Object storage** (S3 and compatible services) stores files durably, serves them cheaply, and integrates with CDNs. Upload via short-lived **pre-signed URLs** so clients upload straight to storage without the file ever passing through your server.

## 23. Environments and Configuration

Keep development, staging, and production fully separate — separate databases, separate keys. Configuration lives in **environment variables**, never in the codebase: database URLs, API keys, and secrets. A leaked key in a git repository is compromised forever, even if you delete the commit.

## Putting It Together

A typical request path in the systems I build looks like this:

\`\`\`text
Client → CDN → Load balancer → App servers (stateless)
                                  ├── Redis cache
                                  ├── MySQL (primary + read replicas)
                                  └── Queue → Workers
\`\`\`

Start simple. Add a cache when you measure a slow read, a queue when a request does work the user should not wait for, and a second server when one is genuinely saturated. Every one of these tools solves a specific pain — adding them before you feel the pain just buys you complexity.
    `,
    date: '2026-09-06',
    readTime: '16 min read',
    category: 'Backend',
    tags: ['Backend', 'Load Balancing', 'Caching', 'Databases', 'Scalability', 'System Design', 'APIs', 'Databases', 'DevOps'],
    icon: 'fas fa-server',
  },

  {
    id: 6,
    slug: 'binance-university-tour-kyambogo',
    title: 'Organizing the Binance University Tour at Kyambogo University',
    excerpt: 'How I organized the Binance & Amplify Growth Africa University Tour stop at Kyambogo University — bringing blockchain education and Web3 opportunities to hundreds of students.',
    content: `
## A Room Full of Curious Minds

On **4th September 2026**, I had the privilege of organizing the **Binance University Tour** at Kyambogo University, in partnership with **Amplify Growth Africa**. The event brought together hundreds of students eager to learn about blockchain technology, cryptocurrency, and the opportunities Web3 creates for young Africans.

## Why This Event Mattered

Blockchain and crypto are no longer abstract buzzwords — they are reshaping finance, remittances, and digital ownership across Africa. Yet many students only encounter these topics through hype on social media. Our goal was simple: give students **practical, grounded education** on how crypto works, how to stay safe, and where the real career opportunities lie.

## What We Covered

The sessions, led in collaboration with the Binance and Amplify Growth Africa teams, walked students through:

- **Blockchain fundamentals** — what a blockchain is, why decentralization matters, and how transactions are verified
- **Crypto safety** — spotting scams, securing wallets, and understanding that "not your keys, not your coins"
- **Trading basics** — how exchanges work, market structure, and responsible participation
- **Careers in Web3** — development, community management, content, compliance, and research roles open to students

## The Turnout

The lecture hall filled up fast — a clear sign that students at Kyambogo are hungry for this knowledge. The Q&A session ran long, with sharp questions on regulation in Uganda, how to start building on-chain projects, and how student developers can contribute to the ecosystem.

## Lessons From Organizing

Putting together an event of this scale taught me a lot beyond the tech:

1. **Partnerships multiply impact** — working with Binance and Amplify Growth Africa gave us credibility, speakers, and materials we couldn't have assembled alone
2. **Logistics are everything** — venue booking, publicity across student groups, sound, and session timing all determine whether people show up and stay
3. **Community is the real product** — the connections students made with each other and the speakers will outlast any single talk

## What's Next

This was one stop on a bigger journey. As **KYUCSA President (2026/2027)**, I plan to keep bringing industry partners to campus so students don't just learn theory — they meet the people building the future. If you're running a developer or fintech community program and want to reach students at Kyambogo University, let's talk.
    `,
    date: '2026-09-05',
    readTime: '5 min read',
    category: 'Community',
    tags: ['Binance', 'Web3', 'Community', 'Kyambogo University', 'Events'],
    icon: 'fab fa-bitcoin',
    coverImage: binanceEventImg,
    coverImageAlt: 'Binance University Tour session at Kyambogo University, organized with Amplify Growth Africa',
  },
  {
    id: 1,
    slug: 'building-scalable-mern-apps',
    title: 'Building Scalable MERN Stack Applications',
    excerpt: 'Lessons learned from building production-ready applications with MongoDB, Express, React, and Node.js — from architecture decisions to deployment strategies.',
    content: `
## Why MERN?

The MERN stack (MongoDB, Express.js, React, Node.js) has become my go-to for full-stack development. The beauty lies in using JavaScript across the entire stack, which dramatically reduces context switching and speeds up development.

## Architecture Decisions That Matter

### 1. Project Structure
I follow a feature-based folder structure rather than a type-based one. Instead of grouping all controllers together, I group everything related to a feature — routes, controllers, models, and tests — in one folder.

### 2. API Design
RESTful APIs with consistent naming conventions make your codebase predictable. I always version my APIs (e.g., \`/api/v1/\`) to allow for backward-compatible changes.

### 3. Database Design
MongoDB's flexibility is powerful but can lead to messy schemas if you're not careful. I use Mongoose schemas with validation and always think about query patterns before designing collections.

## Performance Optimization

- **Indexing**: Always index fields you query frequently
- **Pagination**: Never return all documents at once
- **Caching**: Use Redis for frequently accessed data
- **Lazy Loading**: Load React components on demand with React.lazy()

## Deployment Strategy

I deploy my applications using Docker containers on cloud platforms. This ensures consistency between development and production environments and makes scaling straightforward.

## Key Takeaways

1. Plan your data model before writing code
2. Write tests early — they save time in the long run
3. Use environment variables for all configuration
4. Monitor your application in production
5. Document your API endpoints
    `,
    date: '2025-03-15',
    readTime: '8 min read',
    category: 'Backend',
    tags: ['MERN', 'Node.js', 'MongoDB', 'React'],
    icon: 'fas fa-server',
  },
  {
    id: 2,
    slug: 'ui-ux-principles-for-developers',
    title: 'UI/UX Principles Every Developer Should Know',
    excerpt: 'Design isn\'t just for designers. Here are the fundamental UI/UX principles that have transformed how I build user interfaces and think about user experience.',
    content: `
## Design Is Problem Solving

As a developer who also does UI/UX design, I've learned that good design isn't about making things look pretty — it's about solving problems for users.

## Core Principles

### 1. Visual Hierarchy
Guide the user's eye through your interface using size, color, contrast, and spacing. The most important elements should be the most prominent.

### 2. Consistency
Use consistent patterns throughout your application. If a blue button means "primary action" in one place, it should mean the same everywhere.

### 3. Feedback
Every user action should have visible feedback. Clicked a button? Show a loading state. Submitted a form? Display a success message. Encountered an error? Explain what went wrong.

### 4. Accessibility
Design for everyone. Use sufficient color contrast, provide alt text for images, ensure keyboard navigation works, and test with screen readers.

## Practical Tips

- **White space is your friend**: Don't cram elements together. Generous spacing improves readability
- **Limit your color palette**: 2-3 colors plus neutrals is usually enough
- **Typography matters**: Choose readable fonts and establish a clear type scale
- **Mobile first**: Design for the smallest screen first, then scale up

## Tools I Use

- **Figma** for wireframing and prototyping
- **Tailwind CSS** for rapid UI development
- **Framer Motion** for smooth animations

## The Developer Advantage

As developers, we understand technical constraints that pure designers might miss. Use this knowledge to design interfaces that are not only beautiful but also performant and implementable.
    `,
    date: '2025-02-20',
    readTime: '6 min read',
    category: 'Design',
    tags: ['UI/UX', 'Design', 'Accessibility', 'CSS'],
    icon: 'fas fa-palette',
  },
  {
    id: 3,
    slug: 'getting-started-with-java-spring-boot',
    title: 'My Journey into Java & Spring Boot',
    excerpt: 'Transitioning from JavaScript to Java — why I\'m learning Spring Boot, what surprised me, and how it compares to the Node.js ecosystem I know and love.',
    content: `
## Why Java?

After years of working with JavaScript and the MERN stack, I decided to expand my toolkit with Java and Spring Boot. The enterprise world runs on Java, and understanding it opens doors to a massive ecosystem.

## First Impressions

### The Type System
Coming from TypeScript, Java's static typing felt familiar but more strict. Every variable needs a declared type, and the compiler catches errors that would only surface at runtime in JavaScript.

### Spring Boot Magic
Spring Boot's auto-configuration is incredibly powerful. What would take dozens of lines of Express.js configuration happens automatically. Annotations like \`@RestController\`, \`@GetMapping\`, and \`@Autowired\` feel like magic at first.

## Comparing with Node.js

| Feature | Node.js/Express | Java/Spring Boot |
|---------|----------------|-----------------|
| Setup Speed | Faster | Slower (but more structured) |
| Performance | Great for I/O | Great for computation |
| Ecosystem | npm (huge) | Maven/Gradle (enterprise) |
| Learning Curve | Gentle | Steeper |
| Enterprise Usage | Growing | Dominant |

## What Surprised Me

1. **Dependency Injection**: Spring's DI container is elegant and makes testing much easier
2. **JPA/Hibernate**: ORM that handles database operations with minimal SQL
3. **Security**: Spring Security is comprehensive but complex
4. **Documentation**: JavaDoc culture means better-documented code

## My Learning Path

1. Core Java fundamentals (OOP, collections, streams)
2. Spring Boot basics (REST APIs, dependency injection)
3. Spring Data JPA (database operations)
4. Spring Security (authentication & authorization)
5. Building a full project to solidify knowledge

## Advice for JS Developers

Don't abandon your JavaScript skills — combine them. Being proficient in both ecosystems makes you incredibly versatile. Use Java for backend services where its strengths shine, and React for the frontend where it excels.
    `,
    date: '2025-01-10',
    readTime: '7 min read',
    category: 'Learning',
    tags: ['Java', 'Spring Boot', 'Backend', 'Learning'],
    icon: 'fab fa-java',
  },
  {
    id: 4,
    slug: 'why-mysql-still-wins-for-business-apps',
    title: 'Why MySQL Still Wins for Business Apps',
    excerpt: 'MongoDB is my default for fast-moving products, but for invoicing, membership and reporting systems I keep reaching for MySQL. Here is how I decide.',
    content: `
## The Wrong Question

"SQL or NoSQL?" is the wrong first question. The right one is: **how relational is my data, and how important are guaranteed consistency and ad-hoc reporting?**

## Where MySQL Shines

### 1. Relationships Everywhere
Members belong to organisations, organisations run events, events have registrations and payments. Every one of those is a join. In MySQL that is a one-line query; in a document store it becomes denormalisation and manual sync work.

### 2. Transactions You Can Trust
Anything touching money — invoices, payments, wallet balances — needs real ACID transactions. MySQL gives you that out of the box with InnoDB.

### 3. Reporting
Clients always ask for reports you did not plan for. With SQL you write a query. With a document store you often write a migration.

## Where I Still Pick MongoDB

- Rapidly evolving schemas early in a product's life
- Deeply nested, document-shaped content (CMS pages, form builders)
- Event logs and analytics ingestion

## A Practical Schema Checklist

1. Model entities and their relationships before writing any code
2. Index every foreign key and every column you filter or sort on
3. Use \`DECIMAL\` for money, never \`FLOAT\`
4. Store timestamps in UTC
5. Add constraints in the database, not only in application code
6. Use migrations from day one so environments stay in sync

## Performance Habits

- Read the \`EXPLAIN\` output before optimising anything
- Avoid \`SELECT *\` on wide tables
- Paginate with keyset pagination on large tables instead of large \`OFFSET\` values
- Cache expensive aggregates rather than recomputing per request

## Takeaway

Pick the database that matches the shape of your data and the promises you must keep to your users. For most business software I build in Uganda — associations, schools, shops, dashboards — MySQL is still the boring, correct answer.
    `,
    date: '2025-05-12',
    readTime: '7 min read',
    category: 'Backend',
    tags: ['MySQL', 'Databases', 'Backend', 'Architecture'],
    icon: 'fas fa-database',
  },
  {
    id: 5,
    slug: 'shipping-a-fast-accessible-react-portfolio',
    title: 'Shipping a Fast, Accessible React Portfolio',
    excerpt: 'Performance, accessibility and SEO are not polish you add at the end. Here is the checklist I run through before any React site goes live.',
    content: `
## Performance First

### Ship Less JavaScript
Route-level code splitting with \`React.lazy\` and \`Suspense\` keeps the first load small. Audit your bundle before blaming the framework.

### Images Are Usually the Problem
Compress everything, serve modern formats, set explicit \`width\` and \`height\` to avoid layout shift, and lazy-load anything below the fold.

### Respect Slow Networks
Most of my users are on mobile data. A page that needs 3MB to render is a page most people will never see.

## Accessibility Is Not Optional

- Use semantic HTML: one \`h1\`, real \`button\` and \`a\` elements, landmarks
- Keep visible focus states — never \`outline: none\` without a replacement
- Meet AA contrast in **both** light and dark themes
- Give every meaningful image real alt text
- Honour \`prefers-reduced-motion\` in all your animations

## Animation Without Regret

Framer Motion is wonderful, but animate \`transform\` and \`opacity\` only, keep durations under 500ms, and trigger scroll reveals once. Motion should guide attention, not demand it.

## SEO That Actually Matters

1. A unique title and meta description per route
2. Self-referencing canonical URLs
3. Open Graph and Twitter tags with a real 1200×630 image
4. Structured data — Person, Article, FAQPage — where it fits
5. A sitemap and a robots.txt that does not block you
6. Internal links between related pages

## My Pre-Launch Checklist

- Lighthouse ≥ 90 on performance, accessibility, best practices and SEO
- Keyboard-only walkthrough of every interactive element
- Real-device test on a mid-range Android phone
- All external links open safely and resolve
- Forms tested end to end, including the error states

## Takeaway

Fast and accessible are the same discipline: removing what is unnecessary so the essential thing arrives quickly, for everyone.
    `,
    date: '2025-06-08',
    readTime: '6 min read',
    category: 'Frontend',
    tags: ['React', 'Performance', 'Accessibility', 'SEO'],
    icon: 'fas fa-gauge-high',
  },
];

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
}

export const articles: Article[] = [
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
];

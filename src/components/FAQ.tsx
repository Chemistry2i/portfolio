import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp, revealProps, staggerContainer } from '@/lib/motion';

export const faqs = [
  {
    question: 'How long does a typical project take?',
    answer:
      'A landing page usually takes 1–2 weeks, a multi-page business website 2–4 weeks, and a full-stack web app 4–10 weeks depending on the features. I share a timeline with milestones before we start, so you always know what is coming next.',
  },
  {
    question: 'How do payments work?',
    answer:
      'I work with a 50% deposit to reserve your slot and start the work, and the remaining 50% on delivery. For larger builds we split payments across milestones. I accept bank transfer, mobile money and international transfers.',
  },
  {
    question: 'What do you need from me to get started?',
    answer:
      'A short description of your goals, any brand assets you already have (logo, colours, copy), and examples of sites you like. If you do not have these yet, that is fine — I help shape the direction during the first call.',
  },
  {
    question: 'Do you offer support after launch?',
    answer:
      'Yes. Every package includes a post-launch support window (30–60 days) for bug fixes and small tweaks. After that, I offer monthly maintenance retainers covering updates, backups, monitoring and content changes.',
  },
  {
    question: 'Can you work with my existing website or codebase?',
    answer:
      'Absolutely. I regularly take over existing React, Node.js, MySQL and MongoDB projects — whether that means a redesign, a performance and SEO overhaul, or adding new features to a live product.',
  },
  {
    question: 'Do you work with clients outside Uganda?',
    answer:
      'Yes. I work remotely with clients across time zones, using clear async updates plus scheduled calls. Most of my communication happens over email, WhatsApp and Google Meet.',
  },
  {
    question: 'Who owns the code and the design?',
    answer:
      'You do. Once the final payment is made, full ownership of the code, designs and assets transfers to you, together with deployment access and handover documentation.',
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-12 md:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-10 md:mb-14" variants={fadeUp} {...revealProps}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Frequently Asked Questions</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg px-4">
              The questions clients ask me most before we start working together.
            </p>
          </motion.div>

          <motion.div className="space-y-3 md:space-y-4" variants={staggerContainer(0.08)} {...revealProps}>
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              return (
                <motion.div key={faq.question} variants={fadeUp} className="glass-card rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 md:px-6 md:py-5"
                  >
                    <span className="font-semibold text-foreground text-sm md:text-base">{faq.question}</span>
                    <motion.i
                      className="fas fa-chevron-down text-primary text-sm flex-shrink-0"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p className="text-center text-sm text-muted-foreground mt-8" variants={fadeUp} {...revealProps}>
            Still have a question?{' '}
            <a href="#contact" className="text-primary hover:underline">
              Send me a message
            </a>{' '}
            and I will get back to you within 24 hours.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

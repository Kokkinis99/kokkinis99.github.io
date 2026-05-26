export type BlogPost = {
  title: string;
  content: string;
};

export const BLOG_POSTS = {
  aiSkills: {
    title: 'My favorite AI skills (so far...)',
    content:`
    I'm a bit conflicted when it comes to using AI.
    I wont get too much into detail here, maybe one day I'll share my thoughts on the topic.

    However, when it comes to coding, I feel that agents are a great tool to have in your arsenal.
    But it all comes down to how you use them.
    I remember reading this great post by Paul Graham, "Taste for Makers", and I remember thinking, well sure an agent will eventually write better code than me.
    But will the agent be able to have better taste than me?
    I didn't think so at the time.

    But obviously time is passing and agents are getting better and better.
    And even though I still can easily distinguish the poor taste from AI slop.
    There are tools that are helping me code wise, but taste wise as well.

    So here's a list of my favorite skills, so far:

    1. Interface Craft - Josh Puckett:
      This skill has been a lifesaver for me.
      I got it from Josh's course and it is my all time favorite skill.
      There is not a single task that I've done that I haven't used it.
      Especially the design critique. It's always up to date, always there to challenge my decisions.
      It offers suggestions that are not only useful, but most of the time lead to better decisions.
      If there's one skill that I would recommend to everyone, it's this one.
      I think what makes this skill so great is the little "aha!" moments when you see ideas that are surprsingly out of the box.

    2. Grill with Docs - Matt Pocock:
      Ok this one is not from a course haha!
      I call this my all rounder skill.
      After discussing with interface craft, this is the immediate next step.
      It helps you out step by step to reach a final decision.
      For each task in mind it starts questioning which way you would like to go.
      And what's more interesting is that sometimes it gives you ideas that you wouldn't have thought of yourself.
      It's more like a mentor that drives you to the destination.
      And it also makes Architectural Decision Records (ADRs) which are really useful to have.

    3. Web Animation Design - Emil Kowalski:
      Finally, this skill was initially a lifesaver for me.
      Got it from Emil Kowalski's course, and well, if you know that name, then you know that this skill is a must have.
      Nowadays it's more like a last resort tool in case I've forgotten something.
      Since, studying through the course so many times I've pretty much memorized what the skill offers.
      But still, when I get stuck on an animation, I know this is the place to look.
      Animations, ideas, avoiding js and keyframes, even if you don't use Motion, it's still there to help you out.
      And most importantly, accessibility first.
    `,
  },
};

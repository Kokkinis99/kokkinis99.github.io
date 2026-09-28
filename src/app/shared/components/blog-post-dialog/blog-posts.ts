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
  vakaiRedesign: {
    title: 'Redesigning VaKAI',
    content:`
    My brother is working on a startup called VaKAI, and I got to redesign their landing page.
    They make monitoring software for biogas plants, and the pitch is really good:
    VaKAI spots digester problems days before the lab report does.

    The old page did tell that story, the design just kept getting in the way.
    The headline was "Get more from every digester", which could belong to any supplier.
    It also looked a lot like a template, with gradient buttons and glows everywhere.
    And you had to scroll halfway down the page before you saw the product at all.

    So here's what I changed:

    1. The story first:
      A plant can wait around eight days for lab results, and during that time nobody really knows what's going on inside the digester.
      That's VaKAI's best argument, so I built the whole page around it.
      The headline now says it straight: catch digester problems days before the lab does.
      Then the "without" and "with VaKAI" sections mirror each other.
      There's a day strip you can click to compare each day both ways,
      and a chart that plays one feedstock change both ways. The space between the two lines is the gas you kept.

    2. One idea for the whole identity:
      The new logo is a tiny 4x5 pixel grid, a solid base (the digester) that thins out into green pixels (the gas).
      I ran the photos through a dither shader so they're made of the same square pixels.
      The page opens on a sunset sky and ends on the fields, which I really like.
      I went through four other logo directions before this one.
      This was the only one that said something about the product and still looked good as a favicon.

    3. Colour:
      The old page used bright green everywhere, even on the words describing the problem.
      Now green is only for good outcomes and orange is only for risk.

    4. What I left out:
      I didn't add fade-in animations on every section as you scroll.
      I didn't add testimonials, a logo wall or user counts just to make it look busier.
      Every claim on the page comes from the existing site, and all the numbers in the demo are labelled as example data.
      Leaving stuff out was harder than adding it, haha.

    Emil's animation skill and transitions.dev helped a lot with the motion and the small interactions.
    I also wrote down every decision I made, including the directions I dropped and why.
    I think that log is worth as much as the page, because anyone who touches the site next can see why things look the way they do.
    `,
  },
};

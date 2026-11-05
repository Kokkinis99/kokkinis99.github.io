export type BlogPostImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type BlogPost = {
  title: string;
  content: string;
  images?: BlogPostImage[];
  imagesCaption?: string;
};

export const BLOG_POSTS = {
  paraskinio: {
    title: 'Building παρασκήνιο',
    imagesCaption: '8 screens, on desktop and phone. Click to flip through them.',
    images: [
      {
        src: 'assets/images/paraskinio/paraskinio-landing.jpg',
        alt: 'The παρασκήνιο landing page on desktop and phone: a big "Θέατρο για όλους" headline next to four hand-drawn stick figures in violet, lime, orange and pink, above a row of shows playing in Athens',
        caption: 'Landing',
        width: 1836,
        height: 674,
      },
      {
        src: 'assets/images/paraskinio/paraskinio-profile.jpg',
        alt: 'A demo profile on desktop and phone with a frog avatar, 112 followers, four favourite shows as photos with their titles in white, a diary of shows seen with ratings and short reviews, and an about card',
        caption: 'Profile',
        width: 1836,
        height: 674,
      },
      {
        src: 'assets/images/paraskinio/paraskinio-home.jpg',
        alt: 'The signed-in home page on desktop and phone: notices about likes and new followers, then a row of friends’ activity cards with show photos, star ratings and short reviews',
        caption: 'Home',
        width: 1836,
        height: 674,
      },
      {
        src: 'assets/images/paraskinio/paraskinio-production.jpg',
        alt: 'A show page on desktop and phone for "Καλά, εσύ σκοτώθηκες νωρίς", with a production photo, rating and genre chips, and buttons to log it, add it to your watchlist or a list',
        caption: 'Show page',
        width: 1836,
        height: 674,
      },
      {
        src: 'assets/images/paraskinio/paraskinio-list.jpg',
        alt: 'A list called "αν δεις μόνο τρία φέτος" on desktop and phone, under a hand-drawn orange sunset cover, with three show cards',
        caption: 'List',
        width: 1836,
        height: 674,
      },
      {
        src: 'assets/images/paraskinio/paraskinio-shows.jpg',
        alt: 'The shows page on desktop and phone, with a sentence you edit to filter, "Θέλω να δω οτιδήποτε οπουδήποτε οποτεδήποτε", above a grid of show cards with stickers like "τελευταίες μέρες"',
        caption: 'Shows',
        width: 1836,
        height: 674,
      },
      {
        src: 'assets/images/paraskinio/paraskinio-settings.jpg',
        alt: 'The settings page on desktop and phone, titled "ρυθμίσεις", with the avatar, name, handle, location and links fields, and hand-drawn crown and arrow marks around it',
        caption: 'Settings',
        width: 1836,
        height: 674,
      },
      {
        src: 'assets/images/paraskinio/paraskinio-share.jpg',
        alt: 'The "ήμουν εκεί" share card: the show’s photo and title on the left, and on the right a quoted review, five stars, the theatre and date, and the reviewer’s handle',
        caption: 'Share card',
        width: 1836,
        height: 674,
      },
    ],
    content:`
    παρασκήνιο means backstage in Greek, and it's what I'm building on my own right now.
    It's a community space for theatre in Athens.
    You keep a diary of the shows you've seen, follow other people, and see what's on before it closes.
    A show you saw five years ago counts as much as the one you saw last night.

    I think art is for everyone, so it should be fun, without making it any less.

    So here's what went into it:

    1. Nothing fancy:
      No serifs, no gold, nothing that looks expensive.
      The logo is a little ensemble of stick figures in violet, lime, pink and orange, with some riso-style grain on the fills.
      I drew the illustrations and the 18 animal avatars myself.
      All the copy is in Greek, lowercase and a bit playful.

    2. A catalogue I can trust:
      Users can't add shows. They send a request and I add it.
      Every show is entered by hand from the theatre's own pages, and there are over 200 of them so far.
      I also asked theatres if I could use their production photos, and several said yes.

    3. Made to be shared:
      Profiles and show pages render on the server, so a link looks right when you paste it in a chat.
      The link previews and the "ήμουν εκεί" card are drawn on the server too.

    4. What I left out:
      No user counts anywhere, not even "be one of the first".
      When you're logged in, the home page doesn't try to sell you anything.
      It lists the shows on your watchlist that are about to close.

    It's built with Angular 22 and Firebase, and it's live at paraskinio.app.
    It's web first for now, and an iOS and Android app comes next.
    `,
  },
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
    images: [
      {
        src: 'assets/images/vakai/compare-01-hero.jpg',
        alt: 'Old hero with a green "Get more from every digester" headline over a washed-out farm photo, next to the new hero: "Catch digester problems days before the lab does" over a dithered sunset with a spec bar',
        caption: 'Hero',
        width: 1836,
        height: 532,
      },
      {
        src: 'assets/images/vakai/compare-02-dashboard.jpg',
        alt: 'The old product preview with bright coloured stat cards, next to the new dashboard for Digester Line 1 with a dithered gas chart, methane gauge and instability alert, labelled as example data',
        caption: 'Dashboard',
        width: 1836,
        height: 597,
      },
      {
        src: 'assets/images/vakai/compare-03-gap.jpg',
        alt: 'The old dark green "Eight days blind" section with a static day list, next to the new light version with a clickable day strip comparing each day without and with VaKAI',
        caption: 'The eight-day gap',
        width: 1836,
        height: 559,
      },
      {
        src: 'assets/images/vakai/compare-04-platform.jpg',
        alt: 'The old "See the risk before the lab does" section with a floating €16,800 card, next to the new "Act on day one, not day eight" section with a chart of the gas kept',
        caption: 'With VaKAI',
        width: 1836,
        height: 558,
      },
      {
        src: 'assets/images/vakai/compare-05-trust.jpg',
        alt: 'The old trust strip with four short points, next to the new trust section with a larger headline and a table of read-only, no new hardware, EU data and disconnect any time',
        caption: 'Trust',
        width: 1836,
        height: 325,
      },
      {
        src: 'assets/images/vakai/compare-06-book.jpg',
        alt: 'The old dark free trial form, next to the new light form with numbered steps',
        caption: 'Free trial',
        width: 1836,
        height: 526,
      },
      {
        src: 'assets/images/vakai/compare-07-footer.jpg',
        alt: 'The old dark footer with links, next to the new light footer that ends on a dithered photo of cows grazing near a barn',
        caption: 'Footer',
        width: 1836,
        height: 674,
      },
    ],
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
} satisfies Record<string, BlogPost>;

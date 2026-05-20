export type BlogPost = {
  title: string;
  content: string;
};

export const BLOG_POSTS = {
  monkeytypeClone: {
    title: 'Building the MonkeyType Clone',
    content:
`This is the typing game you can play right below this post — built in Angular, directly in the portfolio.

The idea was simple: could I build a MonkeyType-style experience without any canvas tricks, just HTML, CSS, and Angular signals?

The short answer: yes.

The longer one: it took way more attention to detail than expected. Getting the letter highlighting right, handling backspace gracefully, tracking WPM in real time, managing the word pool without janky reflows — every small thing had its own rabbit hole.

The animation when the game starts — the page blurring and scaling back — was one of my favourite parts. The cursor blink uses @starting-style, which felt like exactly the right tool for the job.

Scroll down to try it.`,
  },
};

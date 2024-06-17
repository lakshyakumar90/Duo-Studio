function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function page1Animation() {
  gsap.from("#page1, #nav", {
    y: 10,
    opacity: 0,
    delay: 0.3,
    duration: 0.7,
  });

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1 h1",
      scroller: "#main",
      start: "top 30%",
      end: "top 0%",
      scrub: 2,
    },
  });

  tl.to(
    "#page1 h1",
    {
      x: -200,
      filter: "blur(3px)",
    },
    `a`
  );

  tl.to(
    "#page1 h2",
    {
      x: 200,
      filter: "blur(3px)",
    },
    `a`
  );

  tl.to(
    "#page1 p",
    {
      filter: "blur(3px)",
    },
    `a`
  );

  gsap.to("#page1 video", {
    scrollTrigger: {
      trigger: "#page1 h1",
      scroller: "#main",
      start: "top 30%",
      end: "top -50%",
      scrub: 1,
    },
    width: "88%",
  });

  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1 h1",
      scroller: "#main",
      start: "top -80%",
      end: "top -80%",
      scrub: 1,
    },
  });
  tl1.to("#main", {
    backgroundColor: "#fff",
  });

  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1 h1",
      scroller: "#main",
      start: "top -560%",
      end: "top -560%",
      scrub: 1,
    },
  });
  tl2.to("#main", {
    backgroundColor: "#0F0D0D",
  });
}

function page2Animation() {
  let elems = document.querySelectorAll(".elem");
  let imageDiv = document.querySelector("#content-right img");
  elems.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      // imageDiv.setAttribute("src", elem.querySelector("img").getAttribute("src"))
      gsap.to(imageDiv, {
        duration: 0.3,
        opacity: 0.5,
        onComplete: function () {
          imageDiv.setAttribute(
            "src",
            elem.querySelector("img").getAttribute("src")
          );
          gsap.to(imageDiv, {
            duration: 0.3,
            opacity: 1,
          });
        },
      });
    });
  });
}

function page3Animation() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page4",
      scroller: "#main",
      start: "top 0%",
      end: "+=999",
      scrub: 2,
      pin: true,
    },
  });
  tl.to("#marquee-scroll", {
    transform: "translateX(-150%)",
  });
}

function page4Animation() {
  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("mousemove", (e) => {
      const img = box.querySelector("img");
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left - img.width / 2 + 120 ;
      const y = e.clientY - rect.top - img.height / 2 + 120 ;
      // img.style.transform = `translate(${x}px, ${y}px)`;

      gsap.to(img,{
        duration: 0.3,
        x: x,
        y: y,
        ease: 'power1.out'
      })
    });

  box.addEventListener("mouseleave", () => {
    gsap.to(img, {
      duration: 0.3,
      opacity: 0,
      ease: 'power1.out'
    });
  }),

  box.addEventListener("mouseenter", () => {
    img = box.querySelector("img");
    img.style.opacity = 1;
  })
})
}

loco();
page1Animation();
page2Animation();
page3Animation();
page4Animation();

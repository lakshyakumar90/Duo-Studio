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

let cursor = document.querySelector("#cursor");
function cursorAnimation() {
  document.addEventListener("mousemove", function (details) {
    const x = details.clientX - 15 + "px";
    const y = details.clientY - 15 + "px";
    gsap.to(cursor, {
      x: x,
      y: y,
    });
  });
}

function navAnimation() {
  document
    .querySelector("#nav #logo")
    .addEventListener("mouseenter", function () {
      gsap.to(cursor, {
        height: "33px",
        width: "33px",
      });
    });
  document
    .querySelector("#nav #logo")
    .addEventListener("mouseleave", function () {
      gsap.to(cursor, {
        height: "16px",
        width: "16px",
      });
    });

  document
    .querySelector("#nav #nav-links")
    .addEventListener("mouseenter", function () {
      gsap.to(cursor, {
        height: "33px",
        width: "33px",
      });
    });
  document
    .querySelector("#nav #nav-links")
    .addEventListener("mouseleave", function () {
      gsap.to(cursor, {
        height: "16px",
        width: "16px",
      });
    });

  document
    .querySelector("#nav #circle-div")
    .addEventListener("mouseenter", function () {
      gsap.to(cursor, {
        height: "33px",
        width: "33px",
      });
    });
  document
    .querySelector("#nav #circle-div")
    .addEventListener("mouseleave", function () {
      gsap.to(cursor, {
        height: "16px",
        width: "16px",
      });
    });

    document.querySelectorAll("#nav #nav-links a, #nav #circle-div").forEach((elem) => {
      elem.addEventListener("mouseenter", () => {
          let word = elem.getAttribute('data-word');
          let purple = document.querySelector(".purple");

          purple.innerHTML = `
              <div id="purple-home">
                  <div class="marquee-container">
                      <h4>${word}</h4>
                      <h4>${word}</h4>
                      <h4>${word}</h4>
                      <h4>${word}</h4>
                      <h4>${word}</h4>
                      <h4>${word}</h4>
                      <h4>${word}</h4>
                      <h4>${word}</h4>
                      <h4>${word}</h4>
                      <h4>${word}</h4>
                      <h4>${word}</h4>
                      <h4>${word}</h4>
                      <h4>${word}</h4>
                  </div>
              </div>
          `;
          purple.style.opacity = 1;
      });

  
      elem.addEventListener("mouseleave", () => {
        let purple = document.querySelector(".purple");
        purple.style.opacity = 0;
      });

    });
    };

function videoAnimation() {
  document
    .querySelector("#page1 video")
    .addEventListener("mouseenter", function () {
      cursor.textContent = `Sound on`;
      gsap.to(cursor, {
        height: "27px",
        width: "100px",
        borderRadius: "50px",
      });
      let counter = 0;
      document
        .querySelector("#page1 video")
        .addEventListener("click", function () {
          if (counter == 0) {
            document.querySelector("#page1 video").muted = false;
            counter = 1;
            cursor.textContent = `Sound off`;
          } else {
            document.querySelector("#page1 video").muted = true;
            counter = 0;
            cursor.textContent = `Sound on`;
          }
        });
    });

  document
    .querySelector("#page1 video")
    .addEventListener("mouseleave", function () {
      cursor.textContent = ``;
      gsap.to(cursor, {
        height: "16px",
        width: "16px",
        borderRadius: "50%",
      });
    });
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

  document
    .querySelector("#page2 #content #content-left")
    .addEventListener("mouseenter", function () {
      gsap.to(cursor, {
        height: "33px",
        width: "33px",
      });
    });
  document
    .querySelector("#page2 #content #content-left")
    .addEventListener("mouseleave", function () {
      gsap.to(cursor, {
        height: "16px",
        width: "16px",
      });
    });

  document
    .querySelector("#page2>button")
    .addEventListener("mouseenter", function () {
      gsap.to(cursor, {
        height: "33px",
        width: "33px",
      });
    });
  document
    .querySelector("#page2>button")
    .addEventListener("mouseleave", function () {
      gsap.to(cursor, {
        height: "16px",
        width: "16px",
      });
    });
}

function featuredDiv() {
  const cards = document.querySelectorAll("#page3 #card-container .card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      cursor.textContent = `View`;
      gsap.to(cursor, {
        height: "30px",
        width: "60px",
        borderRadius: "50px",
      });
    });

    card.addEventListener("mouseleave", function () {
      cursor.textContent = ``;
      gsap.to(cursor, {
        height: "16px",
        width: "16px",
        borderRadius: "50%",
      });
    });
  });

  document
    .querySelector("#page3 #card-container #page3-para button")
    .addEventListener("mouseenter", function () {
      console.log("h3edbwf");
      gsap.to(cursor, {
        height: "33px",
        width: "33px",
      });
    });

  document
    .querySelector("#page3 #card-container #page3-para button")
    .addEventListener("mouseleave", function () {
      gsap.to(cursor, {
        height: "16px",
        width: "16px",
      });
    });
}

function hoverButton(string) {
  var hoverMouse = function ($el) {
    $el.each(function () {
      var $self = $(this);
      var hover = false;
      var offsetHoverMax = $self.attr("offset-hover-max") || 0.7;
      var offsetHoverMin = $self.attr("offset-hover-min") || 0.5;

      var attachEventsListener = function () {
        $(window).on("mousemove", function (e) {
          var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

          var cursor = {
            x: e.clientX,
            y: e.clientY - $(window).scrollTop(),
          };

          var width = $self.outerWidth();
          var height = $self.outerHeight();

          var offset = $self.offset();
          var elPos = {
            x: offset.left + width / 2,
            y: offset.top + height / 2,
          };

          var x = cursor.x - elPos.x;
          var y = cursor.y - elPos.y;

          var dist = Math.sqrt(x * x + y * y);

          var mutHover = false;

          if (dist < width * hoverArea) {
            mutHover = true;
            if (!hover) {
              hover = true;
            }
            onHover(x, y);
          }

          if (!mutHover && hover) {
            onLeave();
            hover = false;
          }
        });
      };

      var onHover = function (x, y) {
        console.log("onHover", x, y); // Debugging log
        TweenMax.to($self, 0.4, {
          x: x * 0.8,
          y: y * 0.8,
          rotation: x * 0.05,
          ease: Power2.easeOut,
        });
      };

      var onLeave = function () {
        console.log("onLeave"); // Debugging log
        TweenMax.to($self, 0.7, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          ease: Elastic.easeOut.config(1.2, 0.4),
        });
      };

      attachEventsListener();
    });
  };

  hoverMouse($(string));
}

function page4Animation() {
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
    transform: "translateX(-180%)",
  });
}

function page5Animation() {
  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("mousemove", (e) => {
      const img = box.querySelector("img");
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left - img.width / 2 + 120;
      const y = e.clientY - rect.top - img.height / 2 + 120;
      // img.style.transform = `translate(${x}px, ${y}px)`;

      gsap.to(img, {
        duration: 0.3,
        x: x,
        y: y,
        ease: "power1.out",
      });
    });

    box.addEventListener("mouseleave", () => {
      gsap.to(img, {
        duration: 0.3,
        opacity: 0,
        ease: "power1.out",
      });
    }),
      box.addEventListener("mouseenter", () => {
        img = box.querySelector("img");
        img.style.opacity = 1;
      });
  });

  document
    .querySelectorAll("#page5 #page5-header h2, #page5 #page5-header button")
    .forEach((elem) => {
      elem.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
          height: "33px",
          width: "33px",
        });
      });
      elem.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
          height: "16px",
          width: "16px",
        });
      });
    });
}

function footerAnimation() {
  document
    .querySelectorAll(
      "#footer #footer-part2 #footer-part2-left form button, #footer #footer-part2 #footer-part2-right>h3, #footer #footer-part2 #footer-part2-right a"
    )
    .forEach((elem) => {
      elem.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
          height: "33px",
          width: "33px",
        });
      });
      elem.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
          height: "16px",
          width: "16px",
        });
      });
    });
}

loco();
page1Animation();
page2Animation();
page4Animation();
page5Animation();
cursorAnimation();
navAnimation();
videoAnimation();
featuredDiv();
hoverButton("#btn-circle");
hoverButton("#footer #footer-part1 #btn-circle");
footerAnimation();

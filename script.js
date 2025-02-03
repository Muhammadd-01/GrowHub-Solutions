// Import jQuery (assuming you're using a CDN)
//<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
const $ = jQuery // Declare $ variable

$(document).ready(() => {
  // Swiper initialization
  if ($(".swiper").length) {
    new Swiper(".swiper", {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
    })
  }

  // Chatbot functionality
  const chatbotIcon = $("#chatbot-icon")
  const chatbot = $("#chatbot")
  const closeChatbot = $("#close-chatbot")
  const chatbotMessages = $("#chatbot-messages")
  const chatbotForm = $("#chatbot-form")
  const chatbotInput = $("#chatbot-input")

  const botResponses = {
    greeting: [
      "Hello! How can I help you today?",
      "Hi there! What can I do for you?",
      "Welcome! How may I assist you?",
    ],
    services:
      "We offer web development, mobile app development, social media management, Shopify store creation, SEO optimization, and cloud solutions. Which service are you interested in?",
    pricing: "Our pricing varies depending on the project scope. Would you like to discuss a specific service?",
    contact:
      "You can reach us at +92 123 456 7890 or email us at contactgrowhub@gmail.com. Would you like to schedule a call?",
    default:
      "I'm not sure I understand. Can you please rephrase or ask about our services, pricing, or contact information?",
  }

  function getRandomResponse(responses) {
    return Array.isArray(responses) ? responses[Math.floor(Math.random() * responses.length)] : responses
  }

  chatbotIcon.on("click", () => {
    chatbot.removeClass("hidden").animate({ opacity: 1, bottom: "90px" }, 300)
    if (chatbotMessages.children().length === 0) {
      addMessage(getRandomResponse(botResponses.greeting))
    }
  })

  closeChatbot.on("click", () => {
    chatbot.animate({ opacity: 0, bottom: "70px" }, 300, function () {
      $(this).addClass("hidden")
    })
  })

  function addMessage(message, isUser = false) {
    const messageElement = $("<div>")
      .text(message)
      .addClass(isUser ? "user-message" : "bot-message")
    chatbotMessages.append(messageElement)
    chatbotMessages.scrollTop(chatbotMessages[0].scrollHeight)
  }

  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return getRandomResponse(botResponses.greeting)
    } else if (lowerMessage.includes("services")) {
      return botResponses.services
    } else if (lowerMessage.includes("pricing") || lowerMessage.includes("cost")) {
      return botResponses.pricing
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("reach")) {
      return botResponses.contact
    } else {
      return botResponses.default
    }
  }

  chatbotForm.on("submit", (e) => {
    e.preventDefault()
    const userMessage = chatbotInput.val().trim()
    if (userMessage !== "") {
      addMessage(userMessage, true)
      chatbotInput.val("")

      setTimeout(() => {
        const botResponse = getBotResponse(userMessage)
        addMessage(botResponse)
      }, 500)
    }
  })

  // Form validation
  $("#contact-form").on("submit", function (e) {
    e.preventDefault()
    if (validateForm()) {
      alert("Thank you for your message. We will get back to you soon!")
      this.reset()
    }
  })

  function validateForm() {
    let isValid = true
    $("#contact-form .form-control").each(function () {
      if ($(this).val().trim() === "") {
        $(this).addClass("is-invalid")
        isValid = false
      } else {
        $(this).removeClass("is-invalid")
      }
    })
    return isValid
  }

  // Newsletter form submission
  $("#newsletter-form").on("submit", function (e) {
    e.preventDefault()
    const emailInput = $(this).find('input[type="email"]')
    if (isValidEmail(emailInput.val().trim())) {
      alert("Thank you for subscribing to our newsletter!")
      this.reset()
    } else {
      alert("Please enter a valid email address.")
    }
  })

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Add fade-in effect for elements
  function handleScrollAnimation() {
    $(".fade-in").each(function () {
      const elementTop = $(this).offset().top
      const viewportBottom = $(window).scrollTop() + $(window).height()
      if (elementTop < viewportBottom - 50) {
        $(this).addClass("visible")
      }
    })
  }

  $(window).on("scroll", handleScrollAnimation)
  $(window).on("load", handleScrollAnimation)

  // Add scrolled class to navbar on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("scrolled")
    } else {
      $(".navbar").removeClass("scrolled")
    }
  })

  // Smooth scrolling for anchor links
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault()
    const target = $(this.hash)
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 70, // Adjust for fixed header
        },
        1000,
      )
    }
  })

  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip()

  // Add hover effect to portfolio items
  $(".portfolio-item").hover(
    function () {
      $(this).find(".card-img-top").css("transform", "scale(1.05)")
    },
    function () {
      $(this).find(".card-img-top").css("transform", "scale(1)")
    },
  )

  // Add hover effect to blog post cards
  $(".blog-post").hover(
    function () {
      $(this).find(".card-img-top").css("transform", "scale(1.05)")
    },
    function () {
      $(this).find(".card-img-top").css("transform", "scale(1)")
    },
  )

  // Add active class to current page in navbar
  const currentLocation = location.pathname
  $(".navbar-nav .nav-link").each(function () {
    const link = $(this).attr("href")
    if (currentLocation.includes(link)) {
      $(this).addClass("active")
    }
  })

  // Animate pricing cards on hover
  $(".pricing-card").hover(
    function () {
      $(this).css("transform", "translateY(-10px)")
    },
    function () {
      $(this).css("transform", "translateY(0)")
    },
  )

  // Fade-in effect for elements (duplicate code removed)
})


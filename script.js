// Import Swiper JS
import Swiper from "swiper"
// import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

document.addEventListener("DOMContentLoaded", () => {
  // Swiper initialization
  if (document.querySelector(".swiper")) {
    const swiper = new Swiper(".swiper", {
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
      },
    })
  }

  // Chatbot functionality
  const chatbotIcon = document.getElementById("chatbot-icon")
  const chatbot = document.getElementById("chatbot")
  const closeChatbot = document.getElementById("close-chatbot")
  const chatbotMessages = document.getElementById("chatbot-messages")
  const chatbotForm = document.getElementById("chatbot-form")
  const chatbotInput = document.getElementById("chatbot-input")

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

  chatbotIcon.addEventListener("click", () => {
    chatbot.classList.remove("hidden")
    if (chatbotMessages.children.length === 0) {
      addMessage(getRandomResponse(botResponses.greeting))
    }
  })

  closeChatbot.addEventListener("click", () => {
    chatbot.classList.add("hidden")
  })

  function addMessage(message, isUser = false) {
    const messageElement = document.createElement("div")
    messageElement.textContent = message
    messageElement.className = isUser ? "user-message" : "bot-message"
    chatbotMessages.appendChild(messageElement)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
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

  chatbotForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const userMessage = chatbotInput.value.trim()
    if (userMessage !== "") {
      addMessage(userMessage, true)
      chatbotInput.value = ""

      setTimeout(() => {
        const botResponse = getBotResponse(userMessage)
        addMessage(botResponse)
      }, 500)
    }
  })

  // Form validation
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      if (validateForm()) {
        alert("Thank you for your message. We will get back to you soon!")
        contactForm.reset()
      }
    })
  }

  function validateForm() {
    const name = document.getElementById("name")
    const email = document.getElementById("email")
    const subject = document.getElementById("subject")
    const message = document.getElementById("message")
    let isValid = true

    if (name.value.trim() === "") {
      setErrorFor(name, "Name cannot be blank")
      isValid = false
    } else {
      setSuccessFor(name)
    }

    if (email.value.trim() === "") {
      setErrorFor(email, "Email cannot be blank")
      isValid = false
    } else if (!isValidEmail(email.value.trim())) {
      setErrorFor(email, "Email is not valid")
      isValid = false
    } else {
      setSuccessFor(email)
    }

    if (subject.value.trim() === "") {
      setErrorFor(subject, "Subject cannot be blank")
      isValid = false
    } else {
      setSuccessFor(subject)
    }

    if (message.value.trim() === "") {
      setErrorFor(message, "Message cannot be blank")
      isValid = false
    } else {
      setSuccessFor(message)
    }

    return isValid
  }

  function setErrorFor(input, message) {
    const formGroup = input.parentElement
    const errorMessage = formGroup.querySelector(".error-message")
    formGroup.classList.add("error")
    if (errorMessage) {
      errorMessage.innerText = message
    } else {
      const msgElement = document.createElement("div")
      msgElement.classList.add("error-message")
      msgElement.innerText = message
      formGroup.appendChild(msgElement)
    }
  }

  function setSuccessFor(input) {
    const formGroup = input.parentElement
    formGroup.classList.remove("error")
    const errorMessage = formGroup.querySelector(".error-message")
    if (errorMessage) {
      formGroup.removeChild(errorMessage)
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Newsletter form submission
  const newsletterForm = document.getElementById("newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const emailInput = newsletterForm.querySelector('input[type="email"]')
      if (isValidEmail(emailInput.value.trim())) {
        alert("Thank you for subscribing to our newsletter!")
        newsletterForm.reset()
      } else {
        alert("Please enter a valid email address.")
      }
    })
  }
})


// Import Swiper JS
import Swiper from "swiper"
// import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

document.addEventListener("DOMContentLoaded", () => {
  // Swiper initialization
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
      "You can reach us at +92 123 456 7890 or email us at contact@growhubsolutions.com. Would you like to schedule a call?",
    portfolio:
      "You can view our portfolio at growhubsolutions.com/portfolio. It showcases our recent projects across various industries.",
    default:
      "I'm not sure I understand. Can you please rephrase or ask about our services, pricing, portfolio, or contact information?",
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
    } else if (lowerMessage.includes("portfolio") || lowerMessage.includes("projects")) {
      return botResponses.portfolio
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

  // Animate sections on scroll
  const sections = document.querySelectorAll("section")
  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  sections.forEach((section) => sectionObserver.observe(section))
})


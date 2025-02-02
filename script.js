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
    hello: "Hello! How can I help you today?",
    services:
      "We offer website development, social media designs, Shopify store creation, and social media management. Which service are you interested in?",
    pricing: "Our pricing packages start from PKR 10,000. Would you like more details on our pricing?",
    contact:
      "You can reach us at +92 123 456 7890 or email us at contact@growhubsolutions.com. How would you like to get in touch?",
    default:
      "I'm sorry, I didn't understand that. Can you please rephrase or ask about our services, pricing, or contact information?",
  }

  chatbotIcon.addEventListener("click", () => {
    chatbot.classList.remove("hidden")
  })

  closeChatbot.addEventListener("click", () => {
    chatbot.classList.add("hidden")
  })

  function addMessage(message, isUser = false) {
    const messageElement = document.createElement("div")
    messageElement.textContent = message
    messageElement.style.marginBottom = "10px"
    messageElement.style.padding = "5px"
    messageElement.style.borderRadius = "5px"
    messageElement.style.maxWidth = "80%"

    if (isUser) {
      messageElement.style.backgroundColor = "#f0f0f0"
      messageElement.style.marginLeft = "auto"
    } else {
      messageElement.style.backgroundColor = "#ff6666"
      messageElement.style.color = "white"
    }

    chatbotMessages.appendChild(messageElement)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  }

  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase()
    for (const key in botResponses) {
      if (lowerMessage.includes(key)) {
        return botResponses[key]
      }
    }
    return botResponses.default
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


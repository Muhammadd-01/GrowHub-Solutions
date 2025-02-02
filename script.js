document.addEventListener("DOMContentLoaded", () => {
    const chatbotMessages = document.getElementById("chatbot-messages")
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
  
    chatbotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && chatbotInput.value.trim() !== "") {
        const userMessage = chatbotInput.value
        addMessage(userMessage, true)
        chatbotInput.value = ""
  
        setTimeout(() => {
          const botResponse = getBotResponse(userMessage)
          addMessage(botResponse)
        }, 500)
      }
    })
  })
  
  
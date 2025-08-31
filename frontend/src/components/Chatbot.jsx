import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! 👋 I'm your The Life Gym assistant. How can I help you today?", isBot: true, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "💪 Membership plans",
    "📅 Class schedule", 
    "🏋️ Personal training",
    "🕐 Operating hours",
    "📞 Contact info"
  ];

  const botResponses = {
    "membership": "We offer 3 membership plans:\n\n💎 **Basic Plan** - $29/month\n• Gym access\n• Basic classes\n\n🌟 **Premium Plan** - $49/month\n• Everything in Basic\n• All classes\n• 1 PT session/month\n\n👑 **VIP Plan** - $79/month\n• Everything in Premium\n• Unlimited PT sessions\n• Nutrition consultation\n\nWould you like details about any specific plan?",
    
    "class": "Our class schedule includes:\n\n🔥 **HIIT Training** - Mon, Wed, Fri (6-7 AM)\n🧘 **Yoga Flow** - Tue, Thu, Sat (7:30-8:30 AM)\n💪 **Strength Training** - Mon, Wed, Fri (6-7 PM)\n❤️ **Cardio Blast** - Tue, Thu (7-8 PM)\n🏃 **Pilates** - Mon, Wed, Fri (9-10 AM)\n⚡ **CrossFit** - Mon-Fri (5:30-6:30 PM)\n\nYou can book classes through our website!",
    
    "training": "Our certified personal trainers offer:\n\n✅ Personalized workout plans\n✅ Nutrition guidance\n✅ Progress tracking\n✅ Injury prevention\n✅ Goal-specific training\n\nBook a free consultation through our contact form or call us at (555) 123-4567!",
    
    "hours": "🕐 **Operating Hours:**\n\n🔓 **Gym Access:** 24/7, 365 days\n👥 **Staffed Hours:**\n• Monday-Friday: 6 AM - 10 PM\n• Weekends: 8 AM - 8 PM\n\nYou can access the gym anytime with your membership card!",
    
    "contact": "📞 **Contact Information:**\n\n📱 Phone: (555) 123-4567\n📧 Email: info@thelifegym.com\n📍 Address: 123 Fitness Street, Gym City\n\n🌐 Website: thelifegym.com\n📱 Follow us on social media for updates!",
    
    "trial": "🎉 **Free 7-Day Trial!**\n\nTry our gym completely FREE for 7 days!\n\n✅ Full gym access\n✅ All group classes\n✅ Locker room facilities\n✅ No commitment required\n\nSign up through our website or visit us in person!",
    
    "default": "I'd be happy to help! 😊\n\nYou can ask me about:\n• Membership plans and pricing\n• Class schedules and booking\n• Personal training services\n• Operating hours\n• Contact information\n• Free trial offers\n\nWhat would you like to know?"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (message = inputValue) => {
    if (!message.trim()) return;

    const userMessage = {
      text: message,
      isBot: false,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(message.toLowerCase());
      const botMessage = {
        text: response,
        isBot: true,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message) => {
    if (message.includes("membership") || message.includes("plan") || message.includes("price")) return botResponses.membership;
    if (message.includes("class") || message.includes("schedule") || message.includes("yoga") || message.includes("hiit")) return botResponses.class;
    if (message.includes("training") || message.includes("trainer") || message.includes("personal")) return botResponses.training;
    if (message.includes("hour") || message.includes("time") || message.includes("open")) return botResponses.hours;
    if (message.includes("contact") || message.includes("phone") || message.includes("email") || message.includes("address")) return botResponses.contact;
    if (message.includes("trial") || message.includes("free") || message.includes("try")) return botResponses.trial;
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) return "Hello! 👋 Welcome to The Life Gym! How can I assist you today?";
    if (message.includes("thank") || message.includes("thanks")) return "You're welcome! 😊 Is there anything else I can help you with?";
    return botResponses.default;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Widget */}
      <div className={`chatbot-widget ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="gym-avatar">🏋️</div>
            <div className="chat-title">
              <h4>The Life Gym</h4>
              <span className="online-status">● Online</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="close-chat">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}>
              {message.isBot && <div className="bot-avatar">🤖</div>}
              <div className="message-content">
                <div className="message-bubble">
                  {message.text.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                <div className="message-time">{message.time}</div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot-message">
              <div className="bot-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="quick-replies">
          {quickReplies.map((reply, index) => (
            <button 
              key={index} 
              onClick={() => handleSend(reply.replace(/[💪📅🏋️🕐📞]/g, '').trim())} 
              className="quick-reply-btn"
            >
              {reply}
            </button>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isTyping}
          />
          <button onClick={() => handleSend()} disabled={isTyping || !inputValue.trim()}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      {/* Chat Toggle Button */}
      <button 
        className={`chat-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <i className="fas fa-comments"></i>
        <div className="chat-notification">
          <span>Need help?</span>
        </div>
      </button>
    </>
  );
};

export default Chatbot;

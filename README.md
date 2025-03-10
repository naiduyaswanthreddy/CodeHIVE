# CrowdHIVE   
**Hive-Powered Crowdfunding Platform**
 
## 📌 Overview  
Hive-Powered Crowdfunding Platform is a **decentralized, transparent, and gamified** fundraising platform built on **Hive Blockchain**. It empowers creators to launch projects, receive funding, and engage a community with full transparency.  

## 🌟 Features  

### 🔹 **Core Functionality**  
- ✅ **Decentralized Crowdfunding** – Secure and trustless project funding via Hive blockchain.  
- ✅ **Hive Authentication** – One-click login using Hive Keychain.  
- ✅ **Smart Contracts for Transparency** – All transactions are verifiable on Hive.  
- ✅ **Gamification System** – Users earn rewards, badges, and leaderboard ranks for engagement.  
- ✅ **AI-Powered Project Recommendations** – Personalized suggestions based on user interests.  

### 🎨 **User Experience Enhancements**  
- ✅ **Dynamic UI Themes** – Light/Dark mode toggle with improved readability.  
- ✅ **Mobile-Friendly & Responsive** – Optimized for seamless browsing across devices.  
- ✅ **Live Community Chat & Discussions** – Engage with project creators and funders in real time.  
- ✅ **Advanced Search & Filtering** – Easily find projects by category, funding goal, or popularity.  


## 🔗 Tech Stack  

| Component       | Technology Used |
|----------------|----------------|
| **Frontend**   | HTML, JavaScript, React.js, Typescript, Tailwind CSS |
| **Backend**    | Node.js, Express.js |
| **Database**   | Hive Blockchain (Decentralized storage) |
| **Authentication** | Hive Keychain API |
| **APIs Used**  | `hive_keychain.requestSignBuffer`, `bridge.get_ranked_posts`, `broadcast.comment` |

## 📜 How It Works  

### **1️⃣ User Authentication**  
Users sign in securely using **Hive Keychain**. Their account is verified via the Hive blockchain.  

### **2️⃣ Project Creation & Funding**  
- Creators submit projects with descriptions, funding goals, and rewards.  
- Backers fund projects using **HIVE tokens**.  

### **3️⃣ Smart Contract Execution**  
- All transactions are recorded on Hive, ensuring **trust & transparency**.  
- Funds are **only released upon milestone completion**.  

### **4️⃣ Gamification & Rewards**  
- Users **earn points and badges** for funding, creating, and sharing projects.  
- **Leaderboard** displays top contributors in a **visually engaging format**.

## 🚀 Project Overview  

[🔗 **Live Demo**](https://crowdhive.netlify.app/) – Try the working platform now!  

This project is a **decentralized crowdfunding platform** powered by **Hive Blockchain**, allowing users to fund and support projects securely, transparently, and efficiently.  

## 🛠️ Setup & Installation  

### **1️⃣ Prerequisites**  
Ensure you have:  
- **Node.js** installed  
- **Hive Keychain extension**  

### **2️⃣ Clone the Repository**  
```sh
git clone https://github.com/yourusername/hive-crowdfunding.git
cd hive-crowdfunding
```

### **3️⃣ Install Dependencies**
```sh
npm install
```

### **4️⃣ Start the Development Server**
```sh
npm start
```

### **5️⃣ Connect to Your Hive Account (MANDATORY)**

You must connect your Hive account via Hive Keychain to access full functionality.
If you don’t have a Hive account, create one here.

### **6️⃣ Open in Browser**
Visit http://localhost:3000 to view the platform.

## 🔥 Hive API Integrations  

| Functionality           | Hive API Used                             |
|------------------------|-----------------------------------------|
| Fetch latest projects  | `bridge.get_ranked_posts`               |
| Post a project        | `broadcast.comment`                     |
| User Authentication   | `hive_keychain.requestSignBuffer`       |
| Get user balance      | `condenser_api.get_accounts`            |
| Send project funding  | `hive_keychain.requestTransfer`         |
| Fetch transaction history | `account_history_api.get_account_history` |


## 📈 Roadmap  

**Phase 1: MVP Completion** – Basic crowdfunding features & Hive authentication.  
**Phase 2: Gamification & Leaderboard** – Reward system for user engagement.  
**Phase 3: AI-Powered Recommendations** – Smart project suggestions.  
**Phase 4: Community Engagement Features** – Live chat, discussion boards, and more.  

## 🛡 Security & Privacy  

- All **funding transactions are on-chain** using Hive’s secure APIs.  
- No personal user data is stored **off-chain**.  
- Data integrity is maintained using **encryption & decentralized storage**.  

## 📜 License  

This project is **open-source** under the **MIT License**.  

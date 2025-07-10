# 📚 Learn Assist  
**Streamline Your Studies: AI-Powered Notes &  Personalized curated youtube playlists!**

---

## 🚀 About The Project

**Learn Assist** is an innovative web application designed to revolutionize how students approach their studies. In the demanding academic world, effective time and resource management are crucial. This project tackles the challenge of efficiently creating study materials by allowing students to quickly transform their extensive syllabi into tailored learning aids: get either concise, AI-generated PDF notes for quick revision, or expertly curated YouTube playlists for dynamic, visual learning journeys.

> No more tedious manual summarization or sifting through vast amounts of information!  
Just paste your syllabus or list of topics,**(in a csv format)** and let Learn Assist do the heavy lifting—giving you more time to focus on understanding and retention.

---

## ✨ Features

### ✅ Current Features
- **AI-Powered Note Generation**  
  Input your syllabus topics, and the application uses **Google Gemini AI (gemini-2.0-flash model)** to generate detailed yet concise short notes.

- **Curated Learning Playlists** 
  A "Create Playlist" feature to expertly curate relevant video playlists from YouTube, designed for dynamic visual understanding.

- **PDF Export**  
  Automatically compiles the generated notes into a neatly formatted PDF for offline study, printing, or sharing.

- **Intuitive Interface**  
  Built with a modern, engaging UI using **Aceternity UI**, ensuring a smooth and pleasant user experience.


### 🛣️ Planned Features (Roadmap)

- **User Accounts & Saved Notes**  
  Allow users to sign in, save, and revisit their generated content.

- **Customizable Prompts & Note Length**  
  Enable fine-tuning of AI output in terms of length, depth, and style.

- **Multi-language Support**  
  Expand AI generation and UI to support multiple languages.

---

## 📸 Sreenshots:
Homescreen: ![WhatsApp Image 2025-07-10 at 16 05 20_418b64af](https://github.com/user-attachments/assets/42506610-3a82-4960-b40f-80223df5bab6)
Playlist Generator screen: ![WhatsApp Image 2025-07-10 at 17 42 43_c34cf360](https://github.com/user-attachments/assets/7028e79e-a093-403f-8016-c227bed55886)
AI notes generator screen: ![WhatsApp Image 2025-07-10 at 15 35 39_12841e4a](https://github.com/user-attachments/assets/9103c69b-6720-40fe-8bc2-eec348f7e194)

---

## 🛠️ Technologies Used

### 🔧 Frontend
- [Next.js](https://nextjs.org/)
- [Aceternity UI](https://ui.aceternity.com/)

### ⚙️ Backend / API
- Node.js
- [Google Gemini AI](https://ai.google.dev) (`@google/generative-ai` with `gemini-2.0-flash`)
- YouTube Data API v3 (via googleapis)
- [PDFKit](https://pdfkit.org/)
- [uuid](https://www.npmjs.com/package/uuid)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

### 📋 Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- npm or yarn
- A Google Gemini API Key (from [Google AI Studio](https://makersuite.google.com/))

---

### 🔧 Installation

**1. Clone the repository:**
```bash
git clone https://github.com/your-username/learn-assist.git
cd learn-assist
```
**2. Install Dependencies:**
```bash
npm install
# OR
yarn install
```
**3. Set up your enviromental variables:**
Create a .env.local file in the root directory:
```bash
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY_HERE
```
**4. Run development server:**
```bash
npm run
# OR
yarn dev
```

## 💡 Usage

1. Paste your syllabus or list of topics into the input box.
2. Click the **"Get Short Notes"** button.
3. The app processes your input via AI and generates a downloadable PDF of short notes.

---

## 📂 Project Structure (Key Files)

| File/Folder                                                  | Description                                      |
|--------------------------------------------------------------|--------------------------------------------------|
| `src/app/api/generate-notes/route.js`                        | Handles AI integration and PDF generation        |
| `src/components/Search.js`                                   | Frontend form and note generation logic          |
| `src/assets/fonts/OpenSans-VariableFont_wdth,wght.ttf`       | Custom font for PDF output                       |
| `.env.local`                                                 | Stores your API key   |
| `public/pdfs/`                                               | Temporary storage for generated PDFs             |

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute:

1. **Fork the repository**
2. **Create a new branch:**
   ```bash
   git checkout -b feature/AmazingFeature
3. **Commit your changes:**
   ```bash
   git commit -m "Add some AmazingFeature"
4. **Push to the branch:**
   ```bash
   git push origin feature/AmazingFeature
5.**Open a pull request**
    Or open an issue with the tag "enhancement" for ideas and improvements.


 
**📄 License**
Distributed under the MIT License.
See LICENSE for more information.



**Made by Gurvansh Singh**

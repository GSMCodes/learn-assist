# 📚 Learn Assist  
**Streamline Your Studies: AI-Powered Syllabus Notes & More!**

---

## 🚀 About The Project

**Learn Assist** is an innovative web application designed to revolutionize how students approach their studies. In the demanding academic world, time and resource management are crucial. This project tackles the challenge of efficiently creating study materials by allowing students to quickly transform their extensive syllabi into concise, AI-generated short notes.

> No more tedious manual summarization or sifting through vast amounts of information!  
Just paste your syllabus, and let Learn Assist do the heavy lifting—giving you more time to focus on understanding and retention.

---

## ✨ Features

### ✅ Current Features
- **AI-Powered Note Generation**  
  Input your syllabus topics, and the application uses **Google Gemini AI (gemini-2.0-flash model)** to generate detailed yet concise short notes.

- **PDF Export**  
  Automatically compiles the generated notes into a neatly formatted PDF for offline study, printing, or sharing.

- **Intuitive Interface**  
  Built with a modern, engaging UI using **Aceternity UI**, ensuring a smooth and pleasant user experience.

### 🛣️ Planned Features (Roadmap)
- **Curated Learning Playlists** *(Coming Soon)*  
  A "Create Playlist" feature to generate curated learning resources from YouTube, websites, etc.

- **User Accounts & Saved Notes**  
  Allow users to sign in, save, and revisit their generated content.

- **Customizable Prompts & Note Length**  
  Enable fine-tuning of AI output in terms of length, depth, and style.

- **Multi-language Support**  
  Expand AI generation and UI to support multiple languages.

---

## 🛠️ Technologies Used

### 🔧 Frontend
- [Next.js](https://nextjs.org/)
- [Aceternity UI](https://ui.aceternity.com/)

### ⚙️ Backend / API
- Node.js
- [Google Gemini AI](https://ai.google.dev) (`@google/generative-ai` with `gemini-2.0-flash`)
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

GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

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

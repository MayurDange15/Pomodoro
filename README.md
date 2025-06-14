# 🍅 Pomodoro Timer – Focus Tool

A modern, customizable Pomodoro Timer built using HTML, CSS, JavaScript, and Bootstrap 5.3. It offers animated visuals, audio feedback, light/dark theme support, and optional background music to help you focus and manage time efficiently.

---

## 📺 Tutorial Sources

This project was created by combining and enhancing content from two YouTube tutorials:

- 🔵 Blob Background Animation: **[Background Animation](https://www.youtube.com/watch?v=vkn7_04oZ0o)** by **Ecem Gokdogan**
- 🔴 Pomodoro Timer Logic: **[Build Pomodoro Timer App](https://www.youtube.com/watch?v=lZAUQAmKj-k)** by **Ecem Gokdogan**

---

## 🚀 Features

- **⏱ Pomodoro Timer Functionality:**

  - Pomodoro: 25-minute focus sessions
  - Short Break: 5 minutes
  - Long Break: 15 minutes
  - Countdown display with animated circular progress

- **🎵 Audio Enhancements:**

  - Background focus music (instrumental loop)
  - Button click sound
  - Session-end bell sound
  - Toggle music on/off with visual feedback

- **🎨 Theming and Visuals:**

  - Light/Dark theme toggle (Bootstrap-based)
  - Animated, morphing blob background
  - Adaptive design using `clamp()` and responsive media queries
  - Visual feedback with icons for theme and audio controls

- **📱 Responsive Design:**

  - Works on mobile, tablet, and desktop
  - Adjusts blob size and layout based on screen size

- **🧠 Modal-Based Instructions:**

  - Clear explanation of the Pomodoro technique included in the UI

- **🛡 Additional UX:**
  - Right-click disabled to prevent distractions

---

## 💻 Installation & Usage

1. **Clone the Repository:**

```bash
git clone https://github.com/MayurDange15/pomodoro-timer.git
cd pomodoro-timer
```

2. **Add Audio Files (Optional):**

Place the following files in a local assets / or root directory:

- `wsm.mp3 (flute background music)`
- `button-sound.mp3`
- `bell-sound.mp3`

Update paths in `script.js` if needed.

3. **Run Locally:**

Just open `index.html` in your browser. No server needed.

## 🎨 Customization

- **Change Timer Durations:** Modify the values in the TimerModes object in `script.js`.
- **Replace Background Music:** Swap out `wsm.mp3` with your preferred audio file.
- **Style Tweaks:** Adjust gradients, sizes, or animation durations in `style.css`.

## 🛠️ Built With

- **HTML5**
- **CSS3 + Keyframes**
- **Bootstrap 5.3**
- **Vanilla JavaScript (ES6+)**

## 📃 License

This project is open-source and free to use under the MIT License. Fork it, remix it, or build on top of it.

## 🙏 Acknowledgements

Special thanks to [Ecem Gokdogan](https://www.youtube.com/@ecemgokdogan) for the base tutorials and inspiration.

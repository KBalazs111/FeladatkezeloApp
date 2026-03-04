## Használt technológiák

- **React** keretrendszer
- **Vite** mint build eszköz és fejlesztői szerver
- **Tailwind CSS** a stílusok nagy részéhez
- **Lucide React** ikonok
- Adattárolás **localStorage** használatával

## Futtatás

1. **Node.js** telepítése az eszközre – [nodejs.org](https://nodejs.org)
2. A projekt mappáján belül függőségek telepítése:
   ```bash
   npm install
   ```
3. Ezután az alábbi parancsokkal futtatható:
   ```bash
   npm run dev
   npm run build
   ```

## Mit csinálnék másképp, ha több időm lenne

- Regisztrációs és felhasználói funkciók
- Tényleges adattárolás, nem csak localStorage
- Hozzáadott feladatok szerkesztése
- Esetleg értesítések a felhasználók számára

## Problémák

Szerettem volna hozzáadni még a naptár és heti nézetet is, azonban az időpontok kezelése és az ehhez kapcsolódó matematikai számítások (dátumkezelés, intervallumok, átfedések stb.)
igencsak bonyolultnak bizonyult, így Claude-ot is használtam a kivitelezéshez.

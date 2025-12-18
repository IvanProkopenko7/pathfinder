# All Paths Lead to the Goal 🎯

Interaktywna wizualizacja algorytmu dynamicznego obliczającego liczbę ścieżek na siatce 7×7, które przechodzą przez określone pole.

## 📋 Problem

Dana jest plansza 7×7. Zadanie polega na obliczeniu liczby różnych tras o zadanej długości, które:
- Zaczynają się na polu startowym **(xp, yp)**
- Kończą się na polu końcowym **(xk, yk)**
- Przechodzą przez pole pośrednie **(xt, yt)** co najmniej raz
- Mają długość **d** (liczba ruchów w czterech kierunkach: góra, dół, lewo, prawo)

### Przykład
```
Wejście: 1 1 2 4 1 2 4
Wyjście: 3
```

## 🚀 Demo

Wizualizacja pokazuje:
- 🟢 **Zielone pole** - start
- 🔴 **Czerwone pole** - koniec
- 🟡 **Żółte pole** - pole pośrednie (trap)
- 🔵 **Niebieskie natężenie** - liczba ścieżek przechodzących przez dane pole

## 🎮 Jak używać

1. Ustaw współrzędne pól (1-7)
2. Określ liczbę kroków (0-14)
3. Dostosuj prędkość animacji
4. Kliknij **▶ Play**

## 🧮 Algorytm

Program wykorzystuje **programowanie dynamiczne** do obliczenia wyniku:

```
Wynik = Wszystkie_ścieżki - Ścieżki_omijające_trap
```

1. **Krok 1**: Oblicz wszystkie możliwe ścieżki ze startu do końca
2. **Krok 2**: Oblicz ścieżki omijające pole pośrednie
3. **Krok 3**: Odejmij, aby uzyskać ścieżki przechodzące przez trap

## 🛠️ Technologie

- HTML5
- CSS3
- Vanilla JavaScript
- Dynamic Programming
- Algorithms

## 📂 Struktura

```
├── index.html      # Główna strona
├── style.css       # Stylowanie
├── scripts.js      # Logika algorytmu
└── icon.png        # Ikona
```

## 🎯 Przykładowe dane testowe

| Start | Koniec | Trap | Kroki | Wynik |
|-------|--------|------|-------|-------|
| 1,1 | 2,4 | 1,2 | 4 | 3 |
| 3,3 | 5,5 | 4,4 | 6 | 80 |
| 3,1 | 3,1 | 2,4 | 8 | 16 |
| 1,1 | 7,7 | 4,4 | 11 | 0 |

## 📝 Licencja

MIT

---

Made with ❤️ for algorithmic visualization

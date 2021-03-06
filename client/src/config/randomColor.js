export default function randomColor() {
  const colorList = [
    "#fc8181",
    "#f6ad55",
    "#f6e05e",
    "#68d391",
    "#4fd1c5",
    "#63b3ed",
    "#7f9cf5",
    "#b794f4",
    "#f687b3",
  ];
  const randomIndex = Math.trunc(Math.random() * 9);
  return colorList[randomIndex];
}

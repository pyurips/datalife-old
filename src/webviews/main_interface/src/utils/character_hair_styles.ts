const maleHairStyles: { value: number }[] = [];
const femaleHairStyles: { value: number }[] = [];

for (let i = 0; i <= 76; i++) {
  if (i !== 23) {
    maleHairStyles.push({ value: i });
  }
}

for (let i = 0; i <= 80; i++) {
  if (i !== 24) {
    femaleHairStyles.push({ value: i });
  }
}

export { maleHairStyles, femaleHairStyles };

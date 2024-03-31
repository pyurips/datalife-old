abstract class Item {
  abstract name: string;
  abstract description: string;
  abstract quality: 'Comum' | 'Incomum' | 'Raro';
  abstract weight: number;
}

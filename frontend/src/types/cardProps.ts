export type CardProps = {
  id: string // Unik identifikator for kortet
  name: string // Navn som vises på kortet
  img: string // URL til bilde for kortet
  status: 'Avlogget' | 'Pålogget' // Status kan enten være 'Avlogget' eller 'Pålogget'
}

export default function combineClasses(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
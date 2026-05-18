// AppError c'est un moule qui sert à dire :
// y a une erreur, voilà le message et le code status et
// dans auth.middlware.js throw stop le code si y a une erreur, puis errotHandler récupère les erreurs
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}
export default AppError;

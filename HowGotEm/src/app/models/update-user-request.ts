export interface UpdateUserRequest {
  email: string,
  name: string,
  surname: string,
  password: string,
  confirmPassword: string,
  address: string,
  city: string,
  postalCode: string,
  birthdate: Date,
  speditionAddress: string,
  speditionCity: string,
  speditionPostalCode: string
}

import { describe, it, expect } from 'vitest';

function validarRut(rut) {
  if (!rut) return false;
  // Valida formato: 7 u 8 dígitos, un guion, y un dígito (0-9) o la letra K/k
  return /^\d{7,8}-[0-9kK]$/.test(rut);
}

describe('Validación de RUT', () => {
  it('debería retornar true para un RUT válido con formato correcto', () => {
    expect(validarRut('12345678-5')).toBe(true);
  });

  it('debería retornar true para un RUT que termine en K (mayúscula o minúscula)', () => {
    expect(validarRut('1234567-K')).toBe(true);
    expect(validarRut('9876543-k')).toBe(true);
  });

  it('debería retornar false si el RUT está vacío', () => {
    expect(validarRut('')).toBe(false);
  });

  it('debería retornar false si el RUT no tiene guion', () => {
    expect(validarRut('123456785')).toBe(false);
  });

  it('debería retornar false si contiene letras en el cuerpo del RUT', () => {
    expect(validarRut('ABCDEFGH-5')).toBe(false);
  });

  it('debería retornar false si es demasiado corto o largo', () => {
    expect(validarRut('123456-1')).toBe(false); // Muy corto
    expect(validarRut('123456789-1')).toBe(false); // Muy largo
  });
});
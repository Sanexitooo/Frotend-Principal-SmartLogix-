import { describe, it, expect } from 'vitest';

function validarApellido(apellido) {
  if (!apellido || apellido.length < 2) return false;
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido);
}

describe('Validación de Apellido', () => {
  it('debería retornar true para un apellido válido común', () => {
    expect(validarApellido('Martinez')).toBe(true);
  });

  it('debería retornar true para otro apellido válido', () => {
    expect(validarApellido('Cuevas')).toBe(true);
  });

  it('debería retornar false si el apellido está vacío', () => {
    expect(validarApellido('')).toBe(false);
  });

  it('debería retornar false si el apellido contiene números', () => {
    expect(validarApellido('Cuevas1')).toBe(false);
  });

  it('debería retornar false si el apellido tiene caracteres especiales inválidos', () => {
    expect(validarApellido('Vergara_!')).toBe(false);
  });

  it('debería retornar false si el apellido es muy corto', () => {
    expect(validarApellido('O')).toBe(false);
  });
});

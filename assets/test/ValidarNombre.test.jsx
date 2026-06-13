import { describe, it, expect } from 'vitest';

function validarNombre(nombre) {
  if (!nombre || nombre.length < 2) return false;
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
}

describe('Validación de Nombre', () => {
  it('debería retornar true para un nombre válido común', () => {
    expect(validarNombre('Tomas')).toBe(true);
  });

  it('debería retornar true para un nombre con tildes', () => {
    expect(validarNombre('Fabián')).toBe(true);
  });

  it('debería retornar false si el nombre está vacío', () => {
    expect(validarNombre('')).toBe(false);
  });

  it('debería retornar false si el nombre contiene números', () => {
    expect(validarNombre('Fabian123')).toBe(false);
  });

  it('debería retornar false si el nombre contiene caracteres especiales', () => {
    expect(validarNombre('Alonzo@')).toBe(false);
  });

  it('debería retornar false si el nombre es demasiado corto', () => {
    expect(validarNombre('A')).toBe(false); // Menos de 2 o 3 letras
  });
});

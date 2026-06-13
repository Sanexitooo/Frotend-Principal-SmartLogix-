import { describe, it, expect } from 'vitest';

function validarEdad(edad) {
  const edadNum = Number(edad);
  return !isNaN(edadNum) && edadNum >= 18 && edadNum < 150;
}

describe('Validación de Edad', () => {
  it('debería retornar true para una edad válida y mayor de edad', () => {
    expect(validarEdad(25)).toBe(true);
  });

  it('debería retornar true (o false dependiendo de la regla de negocio) para un menor de edad', () => {
    // Si tu app exige ser mayor de 18, esto debería esperar false.
    // Cámbialo según tus requerimientos
    expect(validarEdad(17)).toBe(false); 
  });

  it('debería retornar false si la edad es un número negativo', () => {
    expect(validarEdad(-5)).toBe(false);
  });

  it('debería retornar false si la edad es poco realista', () => {
    expect(validarEdad(150)).toBe(false); // Alguien de 150 años no es un caso válido
  });

  it('debería manejar correctamente el dato aunque venga como string', () => {
    // Si tu validador convierte internamente strings numéricos a enteros:
    expect(validarEdad('30')).toBe(true);
    expect(validarEdad('hola')).toBe(false);
  });
});

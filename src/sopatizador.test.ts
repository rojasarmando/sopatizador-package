import { Sopatizador } from './sopatizador';


describe('Sopatizador', () => {
  describe('Constructor', () => {
    it('debería crear una sopa de letras con dimensiones correctas', () => {
      const sopa = new Sopatizador(10, 15);
      const grid = sopa.getAlphabetSoup();
      
      expect(grid.length).toBe(15); // altura
      expect(grid[0].length).toBe(10); // ancho
    });

    it('debería usar valores por defecto 12x12 si no se especifican', () => {
      const sopa = new Sopatizador();
      const grid = sopa.getAlphabetSoup();
      
      expect(grid.length).toBe(12);
      expect(grid[0].length).toBe(12);
    });

    it('debería inicializar todas las celdas con letras aleatorias', () => {
      const sopa = new Sopatizador(5, 5);
      const grid = sopa.getAlphabetSoup();
      
      const allCellsValid = grid.flat().every(cell => 
        typeof cell.text === 'string' && 
        cell.text.length === 1 && 
        /[A-ZÑ]/.test(cell.text)
      );
      
      expect(allCellsValid).toBe(true);
    });
  });

  describe('addWord', () => {
    it('debería agregar una palabra horizontalmente', () => {
      const sopa = new Sopatizador(10, 10);
      // Forzamos una posición conocida para testing
      jest.spyOn(sopa as any, 'generatePositions').mockReturnValue([
        { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 } // Horizontal derecha
      ]);
      
      sopa.addWord("SOL");
      const grid = sopa.getAlphabetSoup();
      
      expect(grid[0][0].text).toBe('S');
      expect(grid[0][1].text).toBe('O');
      expect(grid[0][2].text).toBe('L');
      expect(grid[0][0].decorate).toBe(true);
    });

    it('debería permitir cruces cuando las letras coinciden', () => {
      const sopa = new Sopatizador(10, 10);
      // Primera palabra: "SOL" horizontal
      jest.spyOn(sopa as any, 'generatePositions').mockReturnValueOnce([
        { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }
      ]);
      sopa.addWord("SOL");
      
      // Segunda palabra: "SAL" vertical que cruza en la 'S'
      jest.spyOn(sopa as any, 'generatePositions').mockReturnValueOnce([
        { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }
      ]);
      sopa.addWord("SAL");
      
      const grid = sopa.getAlphabetSoup();
      
      // Verificar el cruce
      expect(grid[0][0].text).toBe('S'); // Letra compartida
      expect(grid[1][0].text).toBe('A');
      expect(grid[2][0].text).toBe('L');
    });

    it('debería rechazar cruces cuando las letras no coinciden', () => {
      const sopa = new Sopatizador(10, 10);
      // Primera palabra: "SOL" horizontal
      jest.spyOn(sopa as any, 'generatePositions')
        .mockReturnValueOnce([
          { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }
        ])
        .mockReturnValue([
          { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 } // Intentar cruce vertical
        ]);
      
      sopa.addWord("SOL");
      
      // Intentar agregar "PAN" vertical que chocaría con la 'S'
      expect(() => sopa.addWord("PAN")).toThrow();
    });

    it('debería lanzar error si no puede colocar la palabra después de intentos', () => {
      const smallSopa = new Sopatizador(3, 3);
      // Forzar que todas las posiciones generadas sean inválidas
      jest.spyOn(smallSopa as any, 'generatePositions').mockReturnValue([
        { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }
      ]);
      // Llenar la primera fila con letras que no coincidan
      const grid = smallSopa.getAlphabetSoup();
      grid[0][0].text = 'X';
      grid[0][1].text = 'Y';
      grid[0][2].text = 'Z';
      grid[0][0].decorate = true;
      grid[0][1].decorate = true;
      grid[0][2].decorate = true;
      
      expect(() => smallSopa.addWord("SOL")).toThrow(
        'No se pudo colocar la palabra "SOL" después de 100 intentos'
      );
    });
  });

  describe('canPlaceWord', () => {
    it('debería permitir colocar en celdas vacías', () => {
      const sopa = new Sopatizador(5, 5);
      const positions = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
      
      expect((sopa as any).canPlaceWord("AB", positions)).toBe(true);
    });

    it('debería permitir colocar donde las letras coinciden', () => {
      const sopa = new Sopatizador(5, 5);
      const grid = sopa.getAlphabetSoup();
      grid[1][1] = { text: 'A', decorate: true };
      const positions = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
      
      expect((sopa as any).canPlaceWord("AB", positions)).toBe(true);
    });

    it('debería rechazar colocar donde las letras no coinciden', () => {
      const sopa = new Sopatizador(5, 5);
      const grid = sopa.getAlphabetSoup();
      grid[1][1] = { text: 'X', decorate: true };
      const positions = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
      
      expect((sopa as any).canPlaceWord("AB", positions)).toBe(false);
    });
  });

  describe('placeWord', () => {
    it('debería colocar las letras en las posiciones correctas', () => {
      const sopa = new Sopatizador(5, 5);
      const positions = [{ x: 1, y: 1 }, { x: 2, y: 1 }];
      
      (sopa as any).placeWord("AB", positions);
      const grid = sopa.getAlphabetSoup();
      
      expect(grid[1][1].text).toBe('A');
      expect(grid[1][2].text).toBe('B');
      expect(grid[1][1].decorate).toBe(true);
    });
  });

  describe('generatePositions', () => {
    it('debería generar posiciones válidas dentro de los límites', () => {
      const sopa = new Sopatizador(5, 5);
      const positions = sopa.generatePositions(3);
      
      positions.forEach(pos => {
        expect(pos.x).toBeGreaterThanOrEqual(0);
        expect(pos.x).toBeLessThan(5);
        expect(pos.y).toBeGreaterThanOrEqual(0);
        expect(pos.y).toBeLessThan(5);
      });
    });

    it('debería generar posiciones consecutivas según la dirección', () => {
      const sopa = new Sopatizador(10, 10);
      // Mock de getRandomInt para controlar la dirección
      jest.spyOn(sopa as any, 'getRandomInt')
        .mockReturnValueOnce(2) // startX
        .mockReturnValueOnce(3) // startY
        .mockReturnValueOnce(0); // dirección: horizontal derecha
      
      const positions = (sopa as any).generatePositions(3);
      
      expect(positions).toEqual([
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 4, y: 3 }
      ]);
    });
  });
});
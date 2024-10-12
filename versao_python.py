import numpy as np
import matplotlib.pyplot as plt


g = 9.81  

def calcular_trajetoria(v0, angulo):
    """
    Calcula a trajetória de um projétil.

    :param v0: Velocidade inicial (m/s)
    :param angulo: Ângulo de lançamento (graus)
    :return: Tupla com arrays (x, y) das coordenadas da trajetória
    """
    angulo_rad = np.radians(angulo)  
    t_voo = 2 * v0 * np.sin(angulo_rad) / g  
    
    
    t = np.linspace(0, t_voo, num=100)
    
    
    x = v0 * np.cos(angulo_rad) * t
    y = v0 * np.sin(angulo_rad) * t - (0.5 * g * t**2)
    
    return x, y

def plotar_trajetoria(v0, angulo):
    """
    Plota a trajetória do projétil.

    :param v0: Velocidade inicial (m/s)
    :param angulo: Ângulo de lançamento (graus)
    """
    x, y = calcular_trajetoria(v0, angulo)  

    
    plt.figure(figsize=(10, 5))
    plt.plot(x, y)
    plt.title('Trajetória do Projétil')
    plt.xlabel('Distância (m)')
    plt.ylabel('Altura (m)')
    plt.grid()
    plt.xlim(0, max(x) + 10)  
    plt.ylim(0, max(y) + 10)  
    plt.axhline(0, color='black', lw=0.5)  
    plt.axvline(0, color='black', lw=0.5)  
    plt.show()


v0 = 50  
angulo = 1  
plotar_trajetoria(v0, angulo)

from tkinter import *
import math
import matplotlib.pyplot as plt
import matplotlib.animation as animation


a1 = math.pi/2
a2 = math.pi/2
a1a = 0
a2a = 0
a1v = 0
a2v = 0
damping = 1
width = 1800
height = 1090
bob1 = NoneType
bob2 = NoneType
px2 = 0
py2 = 0
px1 = 0
py1 = 0
SIZE = 3
fig = plt.figure()
ax1 = fig.add_subplot(111, aspect='equal', autoscale_on=False, xlim=(-1000, 1000), ylim=(-1000, 1000))
ax1.grid()
line, = ax1.plot([], [], 'o-', lw=2)
l1 = 600
l2 = 400


def update(m1, m2):
    global a1, a2, a1v, a2v, a1a, a2a, damping, l1, l2
    g = 9.8

    n1 = -g * (2 * m1 + m2) * math.sin(a1)
    n2 = m2 * g * math.sin(a1 - 2 * a2)
    n3 = 2 * math.sin(a1 - a2) * m2
    n4 = a2v * a2v * l2 + a1v * a1v * l1 * math.cos(a1 - a2)
    n5 = l1 * (2 * m1 + m2 - m2 * math.cos(2 * a1 - 2 * a2))
    a1a = (n1 - n2 - n3 * n4) / n5

    b1 = 2 * math.sin(a1 - a2)
    b2 = a1v * a1v * l1 * (m1 + m2)
    b3 = g * (m1 + m2) * math.cos(a1)
    b4 = a2v * a2v * l2 * m2 * math.cos(a1 - a2)
    b5 = l2 * (2 * m1 + m2 - m2 * math.cos(2 * a1 - 2 * a2))
    a2a = (b1 * (b2 + b3 + b4)) / b5

    a1v += a1a
    a2v += a2a
    a1 += a1v
    a2 += a2v

    a1v *= damping
    a2v *= damping


def init():
    line.set_data([], [])
    return line


def animate(i):
    global px2, py2, px1, py1, ax1, l1, l2
    x1 = (l1 * math.sin(a1))
    y1 = (l1 * math.cos(a1))
    x2 = x1 + (l2 * math.sin(a2))
    y2 = y1 + (l2 * math.cos(a2))
    update(1, 1)
    line.set_data([0, -x1, -x2], [0, -y1, -y2])
    plt.plot([-x2, -px2], [-y2, -py2], color=(abs(y1/1000), abs(y2/1000), abs(x2/1000)))
    px2 = x2
    py2 = y2
    return line


def main():
    global width, height, fig
    ani = animation.FuncAnimation(fig, animate, interval=1, init_func=init)
    plt.show()


if __name__ == '__main__':
    main()

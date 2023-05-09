import { type Directive } from 'vue';

/**
 * @param event
 */
export function onClick(event: MouseEvent) {
  const element = event.currentTarget as HTMLElement;

  const ripple = getRippleElement(element);
  if (!ripple || getComputedStyle(ripple).display === 'none') {
    return;
  }

  ripple.classList.remove('animate-ripple');

  if (!ripple.offsetHeight && !ripple.offsetWidth) {
    refreshSize(element, ripple);
  }

  const rect = element.getBoundingClientRect();

  const offset = {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
  };

  const x = event.pageX - offset.left + document.body.scrollTop - ripple.offsetWidth / 2;
  const y = event.pageY - offset.top + document.body.scrollLeft - ripple.offsetHeight / 2;

  ripple.style.top = y + 'px';
  ripple.style.left = x + 'px';

  ripple.classList.add('animate-ripple');
}

/**
 * @param element
 * @param ripple
 */
export function refreshSize(element: HTMLElement, ripple: HTMLElement) {
  const size = Math.max(element.offsetWidth, element.offsetHeight) + 'px';

  ripple.style.width = size;
  ripple.style.height = size;
}

/**
 * @param event
 */
function onResize(event: UIEvent) {
  const element = event.currentTarget as HTMLElement;

  const ripple = getRippleElement(element);

  if (!ripple) {
    return;
  }

  refreshSize(element, ripple);
}

/**
 * @param event
 */
function onAnimationEnd(event: AnimationEvent) {
  (event.currentTarget as HTMLElement).classList.remove('animate-ripple');
}

/**
 * @param parent
 */
function getRippleElement(parent: HTMLElement): HTMLElement | undefined {
  return Array.from(parent.children).find(
    (element): element is HTMLElement =>
      typeof element.className === 'string' && element.className.includes('app-ripple')
  );
}

export const ripple: Directive = {
  mounted(element: HTMLElement) {
    element.classList.add('overflow-hidden', 'relative');

    const ripple = document.createElement('span');
    const rippleEnabled = (element.dataset.rippleEnabled ?? 'true') === 'true';

    ripple.style.setProperty(
      '--color-contextual-1',
      `var(${element.dataset.rippleColor ?? '--color-white'})`
    );

    ripple.style.display = rippleEnabled ? 'block' : 'none';

    ripple.classList.add(
      'app-ripple',
      'absolute',
      'bg-contextual-1',
      'bg-opacity-20',
      'rounded-full',
      'scale-0',
      'pointer-events-none'
    );

    ripple.setAttribute('role', 'presentation');

    element.appendChild(ripple);

    element.addEventListener('resize', onResize);
    element.addEventListener('mousedown', onClick);
    ripple.addEventListener('animationend', onAnimationEnd);
  },

  updated(element: HTMLElement) {
    element.classList.add('overflow-hidden', 'relative');

    const ripple = getRippleElement(element);

    if (ripple) {
      const rippleEnabled = (element.dataset.rippleEnabled ?? 'true') === 'true';

      ripple.style.setProperty(
        '--color-contextual-1',
        `var(${element.dataset.rippleColor ?? '--color-white'})`
      );

      ripple.style.display = rippleEnabled ? 'block' : 'none';
    }
  },

  unmounted(element: HTMLElement) {
    element.removeEventListener('mousedown', onClick);
    element.removeEventListener('resize', onResize);

    const ripple = getRippleElement(element);

    if (!ripple) {
      return;
    }

    ripple.removeEventListener('animationend', onAnimationEnd);
    ripple.remove();
  },
};

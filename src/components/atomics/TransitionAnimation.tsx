/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from '@emotion/react';
import React, { Key, ReactElement, useEffect, useRef, useState } from 'react';

interface TransitionAnimation {
  ['data-key']: Key;
  wrapperCss?: Interpolation<Theme>;
  className: string;
  children: ReactElement[];
}

type TransitionStatus = 'VISIBLE' | 'HIDDEN';

interface TransitionItem {
  status: TransitionStatus;
  item: ReactElement;
}

const TransitionAnimation = (props: TransitionAnimation) => {
  const childrenRef = useRef<TransitionItem[]>([]);
  const [items, setItems] = useState<ReactElement[]>([]);

  const removeItem = (item: ReactElement) => {
    setItems((items) => items.filter((i) => i !== item));
  };

  useEffect(() => {
    childrenRef.current = props.children.map((child) => {
      const ch: TransitionItem = {
        status: child.key === props['data-key'] ? 'VISIBLE' : 'HIDDEN',
        item: (
          <div key={child.key} className={props.className} css={props.wrapperCss}>
            {child}
          </div>
        ),
      };
      if (child.key === props['data-key']) setItems([ch.item]);
      return ch;
    });
  }, []);

  useEffect(() => {
    childrenRef.current.some((child) => {
      if (child.item.key === props['data-key']) {
        if (child.status !== 'VISIBLE') {
          child.status = 'VISIBLE';

          const clone = React.cloneElement(child.item, {
            ref: (ref: HTMLDivElement) => {
              if (!ref) return;
              ref.classList.remove(props.className, `${props.className}-exit`);
              ref.classList.add(`${props.className}-enter`);
              ref.offsetTop;
              ref.classList.remove(`${props.className}-enter`);
              ref.classList.add(props.className);
            },
          });

          setItems((items) => [...items.filter((item) => item.key !== child.item.key), clone]);
        }
        return true;
      }
      return false;
    });

    return () => {
      childrenRef.current.some((child) => {
        if (child.item.key === props['data-key']) {
          if (child.status !== 'HIDDEN') {
            child.status = 'HIDDEN';
            const clone = React.cloneElement(child.item, {
              ref: (ref: HTMLDivElement) => {
                if (!ref) return;
                ref.offsetTop;
                ref.classList.add(`${props.className}-exit`);
                ref.addEventListener('transitionend', (e) => {
                  if (e.target !== ref) return;
                  removeItem(clone);
                });
              },
            });

            setItems((items) => [...items.filter((item) => item.key !== child.item.key), clone]);
          }
          return true;
        }
        return false;
      });
    };
  }, [props['data-key']]);

  return <>{items}</>;
};

export default TransitionAnimation;

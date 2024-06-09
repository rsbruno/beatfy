import { Children, FC, ReactNode } from "react";

interface IShowProps {
  children: ReactNode;
}

interface IShowWhenProps {
  isTrue: boolean;
  children: ReactNode;
}

interface IShowElseProps {
  render?: ReactNode;
  children?: ReactNode;
}

interface IShowComponent extends FC<IShowProps> {
  When: FC<IShowWhenProps>;
  Else: FC<IShowElseProps>;
}

export const Show: IShowComponent = ({ children }) => {
  let when: React.ReactNode = null;
  let otherwise: React.ReactNode = null;

  Children.forEach(children, (child) => {
    if ((child as any).props.isTrue === undefined) {
      otherwise = child;
    } else if (!when && (child as any).props.isTrue === true) {
      when = child;
    }
  });

  return when || otherwise;
};

Show.When = ({ isTrue, children }: IShowWhenProps) =>
  isTrue ? (children as React.ReactElement) : null;

Show.Else = ({ render, children }: IShowElseProps) => render || (children as React.ReactNode);

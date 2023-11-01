/// <reference types="./vite-env-override.d.ts" />
/// <reference types="vite/client" />

/*
alternative:

declare module '*.module.css' {
    const styles: { [className: string]: string };
    export = styles;
}
*/
declare module "*.scss" {
  interface IClassNames {
    [className: string]: string;
  }

  const className: IClassNames;
  export = className;
}

declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

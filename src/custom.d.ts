declare namespace JSX {
  interface IntrinsicElements {
    "midi-sequence": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
    "midi-note": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      pitch?: string;
      duration?: string;
      velocity?: number;
    };
  }
}

import { useQuery } from "react-query";

// Define a type for the component props that will be wrapped by the HOC
export type WithLoadingProps<T> = {
  data: T;
  isLoading: boolean;
};

// Define the HOC function with generic types
export function withLoading<T>(queryKey: string, fetchFn: () => Promise<T>) {
  return function WithLoadingComponent<Props>(
    WrappedComponent: React.ComponentType<Props & WithLoadingProps<T>>
  ): React.FC<Props> {
    return function WithLoading(props: Props) {
      const { data, isLoading } = useQuery<T>(queryKey, fetchFn);

      // Ensuring data isn't undefined when mounting on the component
      const wrappedProps: WithLoadingProps<T> = {
        data: data!,
        isLoading,
      };

      return <WrappedComponent {...props} {...wrappedProps} />;
    };
  };
}

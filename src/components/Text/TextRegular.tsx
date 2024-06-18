import { Text, TextProps } from 'react-native';

const TextRegular = (props: TextProps) => {
  return <Text {...props} style={[props.style, { fontFamily: 'InterRegular' }]} />;
};

export default TextRegular;

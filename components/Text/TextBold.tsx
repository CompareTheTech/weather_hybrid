import { Text, TextProps } from 'react-native';

const TextBold = (props: TextProps) => {
  return <Text {...props} style={[props.style, { fontFamily: 'InterBold', fontWeight: 'bold' }]} />;
};

export default TextBold;

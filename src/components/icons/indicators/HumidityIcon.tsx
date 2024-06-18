import Svg, { ClipPath, Defs, Path } from 'react-native-svg';

export default function HumidityIcon() {
  return (
    <Svg viewBox="0 0 22 22">
      <Defs>
        <ClipPath id="a">
          <Path d="M8 0h6a8 8 0 0 1 8 8v6a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
        </ClipPath>
      </Defs>
      <Path
        fill="#fff"
        fillOpacity={0.9}
        d="M8 0h6a8 8 0 0 1 8 8v6a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z"
        clipPath="url(#a)"
      />
      <Path
        fill="#379ADC"
        d="M8.528 14.296a4.662 4.662 0 0 1 0-6.592L11 5.232l2.472 2.472a4.662 4.662 0 0 1 0 6.592 3.496 3.496 0 0 1-4.944 0Z"
      />
    </Svg>
  );
}

import QRCode from 'react-native-qrcode-svg';

export default function PunkQR({ address, size, punkIndex}) {
    return (
        <QRCode
            value={address}
            size={size}
            logo={{uri: `https://www.larvalabs.com/public/images/cryptopunks/punk${punkIndex}.png`}}
            logoBackgroundColor="lightgray"
        />
    );
}


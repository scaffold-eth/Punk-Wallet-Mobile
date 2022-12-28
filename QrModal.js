import ModalSkeleton from "./ModalSkeleton";
import PunkQR from "./PunkQR";

export default function WalletModal({ wallet, topBarViewHeight }) {
    const content = () => (<> 
        <PunkQR
            address={wallet?.address}
            size={200}
            punkIndex={3624}
        />
    </>);
 
  return (
      <>
        <ModalSkeleton
            content={content}
            topBarViewHeight={topBarViewHeight}
        />
      </>
    );
}


import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import IconsView from "./IconsView";
import TopBar from "./TopBar";

export default function SafeApp({ width, height, accountHelper, wallet, punkIndex }) {
    const insets = useSafeAreaInsets();
    console.log("insets", insets);

    const barPercentage = 0.1;
    const topBarViewHeight = height * barPercentage;

    const safeWidth = width - insets.left - insets.right;
    const safeHeight = height - insets.top - insets.bottom;

    const iconSize = safeWidth / 4;
    const minTopBarSize = iconSize / 2;
    const maxTopBarSize = 3 * minTopBarSize;

    const rows = Math.floor(safeHeight / iconSize);
    const topBarSize = safeHeight - rows * iconSize;
    const iconsViewHeight = safeHeight - topBarSize;

    return (
        <>
            <View style={{ height: topBarSize, width: "100%" }}>
                <TopBar
                    wallet={wallet}
                    topBarViewHeight={topBarViewHeight}
                    viewWidth={width}
                    punkIndex={punkIndex}
                    accountHelper={accountHelper}
                />
            </View>
            <View style={{ height: iconsViewHeight, width: "100%" }}>
                     <IconsView
                        width={safeWidth}
                        height={iconsViewHeight}
                        insets={insets}
                        iconSize={iconSize}
                        rows={rows}
                        accountHelper={accountHelper}
                        wallet={wallet}
                    />
            </View>
        </>
    );
}


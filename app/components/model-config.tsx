import { ModalConfigValidator, ModelConfig, useAppConfig } from "../store";

import Locale from "../locales";
import { InputRange } from "./input-range";
import { ListItem, Select } from "./ui-lib";

export function ModelConfigList(props: {
    modelConfig: ModelConfig;
    updateConfig: (updater: (config: ModelConfig) => void) => void;
}) {
    const config = useAppConfig();

    return (
        <>
            <ListItem title={Locale.Settings.Model}>
                <Select
                    value={props.modelConfig.model}
                    disabled={true}
                    onChange={(e) => {
                        props.updateConfig(
                            (config) =>
                            (config.model = ModalConfigValidator.model(
                                e.currentTarget.value,
                            )),
                        );
                    }}
                >
                    {config.allModels().map((v, i) => (
                        <option value={v.name} key={i} disabled={!v.available}>
                            {v.name}
                        </option>
                    ))}
                </Select>
            </ListItem>
            <ListItem title={Locale.Settings.Filter}>
                <Select
                    value={props.modelConfig.filter}
                    multiple={true}
                    disabled={true}
                    onChange={(e) => {
                        props.updateConfig(
                            (config) =>
                            (
                                // 将多选框的值赋给config.filter
                                config.filter = Array.from(
                                    e.currentTarget.selectedOptions,
                                ).map((o) => o.value)
                            ),
                        );
                    }}
                >
                    {config.allFilters().map((v, i) => (
                        <option value={v.value} key={i}>
                            {v.name}
                        </option>
                    ))}
                </Select>
            </ListItem>
            <ListItem
                title={Locale.Settings.Confidence.Title}
                subTitle={Locale.Settings.Confidence.SubTitle}
            >
                <InputRange
                    value={(props.modelConfig.confidence ?? 1).toFixed(2)}
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={(e) => {
                        props.updateConfig(
                            (config) =>
                            (config.confidence = ModalConfigValidator.confidence(
                                e.currentTarget.valueAsNumber,
                            )),
                        );
                    }}
                ></InputRange>
            </ListItem>
            <ListItem
                title={Locale.Settings.HistoryCount.Title}
                subTitle={Locale.Settings.HistoryCount.SubTitle}
            >
                <InputRange
                    title={props.modelConfig.historyMessageCount.toString()}
                    value={props.modelConfig.historyMessageCount}
                    min="0"
                    max="64"
                    step="1"
                    onChange={(e) =>
                        props.updateConfig(
                            (config) => (config.historyMessageCount = e.target.valueAsNumber),
                        )
                    }
                ></InputRange>
            </ListItem>

            <ListItem
                title={Locale.Settings.Temperature.Title}
                subTitle={Locale.Settings.Temperature.SubTitle}
            >
                <InputRange
                    value={props.modelConfig.temperature?.toFixed(1)}
                    min="0"
                    max="1" // lets limit it to 0-1
                    step="0.1"
                    onChange={(e) => {
                        props.updateConfig(
                            (config) =>
                            (config.temperature = ModalConfigValidator.temperature(
                                e.currentTarget.valueAsNumber,
                            )),
                        );
                    }}
                ></InputRange>
            </ListItem>


            <ListItem
                title={Locale.Settings.MaxTokens.Title}
                subTitle={Locale.Settings.MaxTokens.SubTitle}
            >
                <input
                    type="number"
                    min={100}
                    max={100000}
                    value={props.modelConfig.max_tokens}
                    onChange={(e) =>
                        props.updateConfig(
                            (config) =>
                            (config.max_tokens = ModalConfigValidator.max_tokens(
                                e.currentTarget.valueAsNumber,
                            )),
                        )
                    }
                ></input>
            </ListItem>

        </>
    );
}

import React, { Component } from "react";
import { Divider, Badge, Button } from "antd";
import "./style.scss";

interface IProps extends React.FC {
    name: string;
    onClick?: () => void;
    disabled: boolean;
    hidden: boolean;
    divider: boolean;
    dividerPosition: "left" | "right";
    dot: boolean;
}

/**
 * @desc 此组件用于链接形式的按钮操作组件
 *
 * @参数说明
 *   (1)name: button的显示文字
 *   (2)onClick: 点击回调函数
 *   (3)disabled: 是否禁用
 *   (4)hidden: 是否隐藏
 *   (5)divider: 是否显示分割线
 *   (6)dividerPosition: 分割线显示的位置，默认在右侧
 *   (7)dot: 右上角是否显示红点
 *
 */

class LinkButton extends Component<IProps> {
    static defaultProps = {
        disabled: false,
        divider: false,
        dividerPosition: "right",
        dot: false,
        hidden: false
    };

    render() {
        const {
            hidden,
            dot,
            disabled,
            onClick,
            name,
            divider,
            dividerPosition
        } = this.props;

        return hidden ? null : (
            <div className="tiger-link-btn-component">
                {divider && dividerPosition === "left" && (
                    <Divider type="vertical" />
                )}
                <Badge count={dot ? 1 : 0} dot>
                    <Button
                        size="small"
                        type="link"
                        onClick={onClick}
                        disabled={disabled}
                    >
                        {name}
                    </Button>
                </Badge>
                {divider && dividerPosition === "right" && (
                    <Divider type="vertical" />
                )}
            </div>
        );
    }
}

export default LinkButton;

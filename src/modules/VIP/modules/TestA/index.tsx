import React, { Component } from "react";
import http from "utils/http";
import Loading from "components/Loading";

class TestA extends Component {
  getList() {
    http
      .get("http://172.25.5.199:6124/", {
        params: {
          a: 1
        },
        responseType: "blob"
      })
      .then(res => {
        // const buf = Buffer.from(res.data, "binary");
        // console.log(buf);
        const file = new Blob([res as any], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        const url = URL.createObjectURL(file);
        const aLink = document.createElement("a");

        aLink.download = "sfc.xlsx";
        aLink.href = url;
        aLink.click();
      });
  }

  showLoading = () => {
    Loading.global(true, "loading...");

    setTimeout(() => {
      Loading.global(false);
    }, 3000);
  };

  render() {
    return (
      <div>
        TestA Page1
        <div onClick={this.getList}>dddd</div>
        <div onClick={this.showLoading}>show Loading</div>
      </div>
    );
  }
}

export default TestA;

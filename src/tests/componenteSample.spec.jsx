import { App } from "../App";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("Title Test",() => {
  it("記録が一つ増えていること", async () => {
    // testId(title)を指定して取得
        render(<App />);
        const title = await screen.findByTestId("title");
        expect(title).toHaveTextContent("学習記録");
        //入力欄とボタンを取得
        const learnRecordForm = screen.getByLabelText("学習内容");
        const learnTimeRecordForm = screen.getByLabelText("学習時間");
        const submitButton = screen.getByRole('button', {name: '登録'});
        //フォームに入力
        fireEvent.change(learnRecordForm, {target: {value: "テスト実行"}});
        fireEvent.change(learnTimeRecordForm, {target: {value: 17}});
        //登録ボタンをクリック
        fireEvent.click(submitButton);
        //リストに学習内容が追加されたか確認
        // console.log(screen.debug());
        await waitFor(() => {
          const recordList = screen.getByTestId(`${"recordData"}`).querySelectorAll("li");
          const lastItem = recordList[recordList.length -1];
          expect(lastItem).toBeVisible();
          // expect(lastItem).getByTestId("content");
          // expect(lastItem).getByTestId("time");
          // expect(lastItem).getByTestId("time-string");
        });
        
        //リストに学習時間が表示されているか確認
        // const TimerecordList = await screen.findByText(17);
        // expect(TimerecordList).toBeVisible();
        });
    });
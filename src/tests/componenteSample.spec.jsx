import { App } from "../App";
import React from "react";
import '@testing-library/jest-dom'
import { within, render, screen, fireEvent, waitFor } from "@testing-library/react";

//各テストケースを実行前にAppコンポーネントをレンダリングする。
describe("AppComponent_render", () => {
  beforeEach(() => {
    render(<App />);
  });
  describe("Title", () => {
    test("タイトルが表示されている",
      async () => {
            const title = await screen.findByTestId("title");
            expect(title).toHaveTextContent("学習記録");
      }
    );
  });
  describe("フォームに入力ができること", () => {
    test("学習内容が入力できる",
      async () => {
            const learnRecordForm = await screen.findByLabelText("学習内容");
            fireEvent.change(learnRecordForm, {target: { value: "test" }});
            expect(learnRecordForm).toHaveValue("test");
      }
    );
  });
  describe("フォームに入力ができること", () => {
    test("学習時間が入力できる",
      async () => {
            const learnTimeRecordForm = await screen.findByLabelText("学習時間");
            fireEvent.change(learnTimeRecordForm, {target: { value: 12 }});
            //入力した値を数値に変換して入力値と等しいかを比較する。
            expect(Number(learnTimeRecordForm.value)).toBe(12);
      }
    );
  });
  describe("記録が一つ増えていること", () => {
    test("入力した内容を登録して1つ増えていることを確認", 
      async () => {
            const recordList = await screen.findByTestId("recordData");
            const initalRecordList = within(recordList).findAllByRole("listitem");
            const initalCount = initalRecordList.length;
            const submitButton = await screen.findByRole("button", {name: "登録"});
            fireEvent.click(submitButton);

        await waitFor (async () => {
            const updateRecordList = await screen.findByTestId("recordData");
            const updatedItem = await within(updateRecordList).findAllByRole("listitem");
            expect(updatedItem.length).toBe(initalCount + 1 );
            
            //登録したアイテムが表示されているか確認
            const lastItem = updatedItem[updatedItem.length - 1 ];
            expect(lastItem).toBeVisible();
            console.log(typeof lastItem );

            //登録した内容が表示されているかを確認


      });
    }
    )
  })
});



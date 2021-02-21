// npx run cypress
// npx cypress open

describe("Input form", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("focuses input on load", () => {
    cy.focused().should("have.class", "inputText");
  });

  // .only run by itself?!
  it("accepts input", () => {
    const typedText = "Buy Milk";
    cy.get(".inputText")
      .type(typedText)
      .should("have.value", typedText);
  });

  context("Form submission", () => {
    it("Adds a new todo on submit", () => {
      const typedText = "buy eggs";
      cy.get(".inputText")
        .type(typedText)
        .type("{enter}")
        .should("have.value", "");
      cy.get(".item label")
        .should("have.length", 1)
        .and("contain", typedText);
    });
    it("check if todo item dont exist", () => {
      const typedText = "buy eggs";
      const typedText2 = "buy Milk";
      cy.get(".inputText")
        .type(typedText)
        .type("{enter}")
        .type(typedText2)
        .type("{enter}");
      cy.get(".item__button")
        // to get element by index
        .eq(1)
        .click();
      cy.get(".item label").should("have.length", 1);
      cy.get(".item__button")
        .eq(0)
        .click();
      cy.get(".item label").should("not.exist");
    });
    it("it checked first 2 to do elements and show only checked", () => {
      const typedText = "buy eggs";
      const typedText2 = "buy Milk";
      const typedText3 = "buy anananas";
      cy.get(".inputText")
        .type(typedText)
        .type("{enter}")
        .type(typedText2)
        .type("{enter}")
        .type(typedText3)
        .type("{enter}");
      cy.get(".item__checkbox")
        .eq(0)
        .check();
      cy.get(".item__checkbox")
        .eq(1)
        .check();
      cy.get(".checked").should("have.length", 2);
      cy.contains("checked").click();
      cy.get(".item label").should("have.length", 2);
      cy.contains("all").click();
      cy.get(".item label").should("have.length", 3);
    });
  });
  it("it shoud show alarm message when add empty to do task", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get("button")
      .contains("Add")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("you need to write something");
      });
  });
});

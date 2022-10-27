interface IChecker {
    isValid(): boolean;
}

class AccountNameChecker implements IChecker {
    constructor(private readonly accountName: string) { }

    isValid() {
        return !!this.accountName.match(/^([A-Z]|[a-z]|[0-9]){4,32}$/g);
    }
}

class PersonalIdentificationNumberChecker implements IChecker {
    constructor(private readonly personalIdetificationNumber: number) { }

    isValid() {
        return !!`${this.personalIdetificationNumber}`.match(/^\d{4,8}$/g);
    }
}

class CashManager {
    #accountBalance = 0;

    #hasEnoughMoney(amount: number) {
        return this.#accountBalance > amount;
    }

    #cashLogger() {
        console.log(`Cash in account: ${this.#accountBalance}`);
    }

    deposit(amount: number) {
        this.#accountBalance += amount;
        this.#cashLogger();
    }

    withdraw(amount: number) {
        if (this.#hasEnoughMoney(amount)) {
            this.#accountBalance -= amount;
            this.#cashLogger();
        } else {
            console.warn('Not enough money!');
        }
    }
}

class BankAccountFacade {
    #isAccountValid: boolean;
    #cashManager = new CashManager();

    constructor(public accountName: string, public personalIdentificationNumber: number) {
        const accountNameChecker = new AccountNameChecker(this.accountName);
        const personalIdentificationNumberChecker =
            new PersonalIdentificationNumberChecker(this.personalIdentificationNumber);
        this.#isAccountValid =
            accountNameChecker.isValid() && personalIdentificationNumberChecker.isValid();
        if (!this.#isAccountValid) console.warn('Account invalid!');
    }

    depositCash(cashAmount: number) {
        if (!this.#isAccountValid) return;
        this.#cashManager.deposit(cashAmount);
    }

    withdrawCash(cashAmount: number) {
        if (!this.#isAccountValid) return;
        this.#cashManager.withdraw(cashAmount);
    }
}

const bankAccountFacade = new BankAccountFacade('thiendo261', 1234);
bankAccountFacade.depositCash(1_000_000);
bankAccountFacade.withdrawCash(100_000);
bankAccountFacade.withdrawCash(500_000);
bankAccountFacade.depositCash(1_000_000);
bankAccountFacade.withdrawCash(1_500_000);

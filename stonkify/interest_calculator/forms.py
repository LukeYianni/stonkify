from django import forms

class InvestmentForm(forms.Form):
    initialAmount = forms.IntegerField()
    monthlyDeposit = forms.IntegerField()
    interestRate = forms.IntegerField()
    monthFlag = forms.CharField()